package org.kupbilet.tickets.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Order.
 */
@Entity
@Table(name = "orders")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="ID_Order")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn (name = "ID_Client")
    @JsonBackReference
    private User clientId;



    @Column(name = "order_date")
    private Instant orderDate;

    @Column(name = "is_paid")
    private Integer isPaid;

    @OneToMany(mappedBy = "orderId", cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Ticket> tickets= new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public Order orderDate(Instant orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public Integer getIsPaid() {
        return isPaid;
    }

    public Order isPaid(Integer isPaid) {
        this.isPaid = isPaid;
        return this;
    }

    public void setIsPaid(Integer isPaid) {
        this.isPaid = isPaid;
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
        Order order = (Order) o;
        if (order.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), order.getId());
    }

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", isPaid=" + getIsPaid() +
            "}";
    }

    public User getClientId() {
        return clientId;
    }

    public void setClientId(User clientId) {
        this.clientId = clientId;
    }
}
