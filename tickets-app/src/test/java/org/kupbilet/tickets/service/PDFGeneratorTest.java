package org.kupbilet.tickets.service;

import org.junit.Before;
import org.junit.Test;
import org.kupbilet.tickets.domain.Event;
import org.kupbilet.tickets.domain.Order;
import org.kupbilet.tickets.domain.Ticket;
import org.kupbilet.tickets.domain.User;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class PDFGeneratorTest {

    private PDFGenerator pdfGenerator;

    @Before
    public void setUp() {
        List<Ticket> ticketList=new ArrayList<>();
        Event event=new Event();
        event.setName("juwenalia");
        Ticket ticket1=new Ticket();
        ticket1.setEventId(event);
        ticket1.setPrice(100.0);
        Order order=new Order();
        order.setId(0L);
        ticket1.setOrderId(order);
        ticket1.setId(0L);
        ticketList.add(ticket1);
        Ticket ticket2 =new Ticket();
        ticket2.setEventId(event);
        ticket2.setPrice(100.0);
        ticket2.setId(0L);
        ticketList.add(ticket2);
        User user=new User();
        user.setLogin("jakislogin");
        pdfGenerator=new PDFGenerator(ticketList,user);
    }

    @Test
    public void checkIfGenerateCorrect() {
        String contins="pdfs/tickets";
        assertTrue(pdfGenerator.getPath().contains(contins));
    }


}
