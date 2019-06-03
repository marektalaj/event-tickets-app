package org.kupbilet.tickets.service;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.CMYKColor;
import com.itextpdf.text.pdf.PdfWriter;
import org.kupbilet.tickets.domain.Ticket;
import org.kupbilet.tickets.domain.User;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Random;

public class PDFGenerator {
    private Document document;
    private String path;

    public PDFGenerator(List<Ticket> tickets,User user  ) {
        document=createPDF(tickets,user);


    }

    private Document createPDF(List<Ticket> tickets, User user) {
        Document document=new Document();
        Font blueFont = FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL, new CMYKColor(255, 0, 0, 0));
        Font redFont = FontFactory.getFont(FontFactory.COURIER, 12, Font.BOLD, new CMYKColor(0, 255, 0, 0));
        try
        {
            int random=(int) (Math.random()*10000000);
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("pdfs/tickets"+random+".pdf"));
            this.path="pdfs/tickets"+random+".pdf";
            document.open();
            //document.add(new Paragraph("Styling Example"));

            Paragraph chapterTitle = new Paragraph("Poniżej zamieszczamy Twoje bilety:");
            Chapter chapter1 = new Chapter(chapterTitle, 1);
            chapter1.setNumberDepth(0);
            for(Ticket ticket:tickets){
                Paragraph sectionTitle = new Paragraph(ticket.getEventId().getName(),redFont);
                Section section1 = chapter1.addSection(sectionTitle);
                Paragraph sectionContent = new Paragraph("Identyfikator: "+ticket.getId()+" Cena: "+ticket.getPrice(),blueFont);
                section1.add(sectionContent);
            }
            String qr_path=getQrPatch(random);
            Image image1 = Image.getInstance(System.getProperty("user.dir")+qr_path);

            document.add(chapter1);
            document.add(image1);
            document.close();
            writer.close();
        } catch (Exception e)
        {
            e.printStackTrace();
        }



        return document;
    }

    private String getQrPatch(int random) {
        BitMatrix byteMatrix = null;
        try {
            byteMatrix = new QRCodeWriter().encode(
                "http://kupbilet.org/", BarcodeFormat.QR_CODE, 300, 300);
            MatrixToImageWriter.writeToStream(byteMatrix, "png",
                new FileOutputStream("qrcode/qr_code"+random+".png"));
        } catch (WriterException|IOException e) {
            e.printStackTrace();
        }
        return "/qrcode/qr_code"+random+".png";
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
