package org.kupbilet.tickets.domain;

public class ConfirmationModel {
    private User user;
    private Ticket[] tickets;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ticket[] getTickets() {
        return tickets;
    }

    public void setTickets(Ticket[] tickets) {
        this.tickets = tickets;
    }

    public String getMessege() {
        StringBuilder messege=new StringBuilder();
        for (Ticket ticket:tickets){
            messege.append("Bilet o identyfikatorze: ");
            messege.append(ticket.getId());
            messege.append(", na wydarzenie: ");
            messege.append(ticket.getEventId().getName());
            messege.append(", w cenie: ");
            messege.append(ticket.getPrice());
            messege.append("  |  ");
        }
        System.out.println(messege.toString());
        return messege.toString();
    }

    public void setMessege(String messege) {

    }
}
