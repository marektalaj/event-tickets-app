package org.kupbilet.tickets.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.Set;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

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

    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "eventId", cascade = CascadeType.ALL)
    private Set<Ticket> tickets;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Event name(String name) {
        this.name = name;
        return this;
    }

    public Category getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getEventDate() {
        return eventDate;
    }

    public Event eventDate(Instant eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventAddress() {
        return eventAddress;
    }

    public Event eventAddress(String eventAddress) {
        this.eventAddress = eventAddress;
        return this;
    }

    public void setEventAddress(String eventAddress) {
        this.eventAddress = eventAddress;
    }

    public Long getAmountOfTickets() {
        return amountOfTickets;
    }

    public Event amountOfTickets(Long amountOfTickets) {
        this.amountOfTickets = amountOfTickets;
        return this;
    }

    public void setAmountOfTickets(Long amountOfTickets) {
        this.amountOfTickets = amountOfTickets;
    }

    public String getDescription() {
        return description;
    }

    public Event description(String description) {
        this.description = description;
        return this;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Event event = (Event) o;
        if (event.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", eventDate='" + getEventDate() + "'" +
            ", eventAddress='" + getEventAddress() + "'" +
            ", amountOfTickets=" + getAmountOfTickets() +
            ", description='" + getDescription() + "'" +
            "}";
    }

//    public Category setEventCategory(Category category) {
//        categoryId=category;
//        return category;
//    }
}
