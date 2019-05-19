package org.kupbilet.tickets.domain.domain.lite;

import org.kupbilet.tickets.domain.Category;

import javax.persistence.*;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "event")
public class EventLite {

    @Id
    @Column(name="ID_Event")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name = "ID_Category")
    private Category categoryId;

    @Column(name = "Name")
    private String name;

    @Column(name = "event_date")
    private Instant eventDate;

    @Column(name = "event_address")
    private String eventAddress;

    @Column(name = "price")
    private Double price;

    @Column(name = "amount_of_tickets")
    private Long amountOfTickets;

    @Column(name = "Description")
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getEventDate() {
        return eventDate;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventAddress() {
        return eventAddress;
    }

    public void setEventAddress(String eventAddress) {
        this.eventAddress = eventAddress;
    }

    public Long getAmountOfTickets() {
        return amountOfTickets;
    }

    public void setAmountOfTickets(Long amountOfTickets) {
        this.amountOfTickets = amountOfTickets;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EventLite)) return false;
        EventLite eventLite = (EventLite) o;
        return Objects.equals(id, eventLite.id) &&
            Objects.equals(categoryId, eventLite.categoryId) &&
            Objects.equals(name, eventLite.name) &&
            Objects.equals(eventDate, eventLite.eventDate) &&
            Objects.equals(eventAddress, eventLite.eventAddress) &&
            Objects.equals(amountOfTickets, eventLite.amountOfTickets) &&
            Objects.equals(description, eventLite.description);
    }

    @Override
    public String toString() {
        return "EventLite{" +
            "id=" + id +
            ", categoryId=" + categoryId +
            ", name='" + name + '\'' +
            ", eventDate=" + eventDate +
            ", eventAddress='" + eventAddress + '\'' +
            ", amountOfTickets=" + amountOfTickets +
            ", description='" + description + '\'' +
            '}';
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, categoryId, name, eventDate, eventAddress, amountOfTickets, description);
    }
}
