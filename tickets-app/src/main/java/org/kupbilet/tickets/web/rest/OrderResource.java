package org.kupbilet.tickets.web.rest;
import org.kupbilet.tickets.domain.Order;
import org.kupbilet.tickets.domain.Ticket;
import org.kupbilet.tickets.domain.User;
import org.kupbilet.tickets.repository.OrderRepository;
import org.kupbilet.tickets.web.rest.errors.BadRequestAlertException;
import org.kupbilet.tickets.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing Order.
 */
@RestController
@RequestMapping("/api")
public class OrderResource {

    private final Logger log = LoggerFactory.getLogger(OrderResource.class);

    private static final String ENTITY_NAME = "order";

    private final OrderRepository orderRepository;

    public OrderResource(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * POST  /orders : Create a new order.
     *
     * @param order the order to create
     * @return the ResponseEntity with status 201 (Created) and with body the new order, or with status 400 (Bad Request) if the order has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) throws URISyntaxException {
        log.debug("REST request to save Order : {}", order);
        if (order.getId() != null) {
            throw new BadRequestAlertException("A new order cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Order result = orderRepository.save(order);
        return ResponseEntity.created(new URI("/api/orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /orders : Updates an existing order.
     *
     * @param order the order to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated order,
     * or with status 400 (Bad Request) if the order is not valid,
     * or with status 500 (Internal Server Error) if the order couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/orders")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order) throws URISyntaxException {
        log.debug("REST request to update Order : {}", order);
        if (order.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Order result = orderRepository.save(order);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, order.getId().toString()))
            .body(result);
    }

    /**
     * GET  /orders : get all the orders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orders in body
     */
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        log.debug("REST request to get all Orders");
        return orderRepository.findAll();
    }

    /**
     * GET  /orders/:id : get the "id" order.
     *
     * @param id the id of the order to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the order, or with status 404 (Not Found)
     */
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        log.debug("REST request to get Order : {}", id);
        Optional<Order> order = orderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(order);
    }

    /**
     * DELETE  /orders/:id : delete the "id" order.
     *
     * @param id the id of the order to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        log.debug("REST request to delete Order : {}", id);
        orderRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/orders/{orderId}/tickets")
    public Set<Ticket> getTicketsByOrderId(@PathVariable(value = "orderId") Long orderId) {
        Optional<Order> order= orderRepository.findById(orderId);
        Order temp=order.get();

        return temp.getTickets();
    }

}
