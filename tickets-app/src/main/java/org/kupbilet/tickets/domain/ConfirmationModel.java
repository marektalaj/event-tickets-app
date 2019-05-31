package org.kupbilet.tickets.domain;

import org.omg.CORBA.TIMEOUT;

import java.util.List;

public class ConfirmationModel {
    private User user;
    private List<Ticket> tickets;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public String getMessege() {
        StringBuilder messege=new StringBuilder();
        if(tickets!=null){
            for (Ticket ticket:tickets){
                messege.append("Bilet o identyfikatorze: ");
                messege.append(ticket.getId());
                messege.append(", na wydarzenie: ");
                messege.append(ticket.getEventId().getName());
                messege.append(", w cenie: ");
                messege.append(ticket.getPrice());
                messege.append("  |  ");
            }
        }
        System.out.println(messege.toString());
        return messege.toString();
    }

    public void setMessege(String messege) {

    }
}
