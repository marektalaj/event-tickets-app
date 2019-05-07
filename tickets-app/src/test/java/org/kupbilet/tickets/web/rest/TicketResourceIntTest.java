package org.kupbilet.tickets.web.rest;

import org.kupbilet.tickets.TicketsApp;

import org.kupbilet.tickets.domain.Category;
import org.kupbilet.tickets.domain.Event;
import org.kupbilet.tickets.domain.Order;
import org.kupbilet.tickets.domain.Ticket;
import org.kupbilet.tickets.repository.EventRepository;
import org.kupbilet.tickets.repository.OrderRepository;
import org.kupbilet.tickets.repository.TicketRepository;
import org.kupbilet.tickets.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static org.kupbilet.tickets.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TicketResource REST controller.
 *
 * @see TicketResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TicketsApp.class)
public class TicketResourceIntTest {

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final Double DEFAULT_DISCOUNT = 1D;
    private static final Double UPDATED_DISCOUNT = 2D;

    //Event data
    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_EVENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EVENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_EVENT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_EVENT_ADDRESS = "BBBBBBBBBB";

    private static final Long DEFAULT_AMOUNT_OF_TICKETS = 1L;
    private static final Long UPDATED_AMOUNT_OF_TICKETS = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    //Order data
    private static final Instant DEFAULT_ORDER_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ORDER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_IS_PAID = 1;
    private static final Integer UPDATED_IS_PAID = 2;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTicketMockMvc;

    private MockMvc restEventMockMvc;

    private MockMvc restOrderMockMvc;

    private Ticket ticket;

    private Event event;

    private Order order;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TicketResource ticketResource = new TicketResource(ticketRepository);
        this.restTicketMockMvc = MockMvcBuilders.standaloneSetup(ticketResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();

        MockitoAnnotations.initMocks(this);
        final EventResource eventResource = new EventResource(eventRepository);
        this.restEventMockMvc = MockMvcBuilders.standaloneSetup(eventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();

        MockitoAnnotations.initMocks(this);
        final OrderResource orderResource = new OrderResource(orderRepository);
        this.restOrderMockMvc = MockMvcBuilders.standaloneSetup(orderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public Ticket createEntityTicket(EntityManager em) {
        Ticket ticket = new Ticket()
            .price(DEFAULT_PRICE)
            .discount(DEFAULT_DISCOUNT);

        Event event2 = new Event();
//        ticket.setId(1L);
        event2.setId(0L);
        ticket.setEventId(event2);
        Order order2 = new Order();
        order2.setId(0L);
        ticket.setOrderId(order2);
        return ticket;
    }

    public static Event createEntityEvent(EntityManager em) {
        Event event = new Event()
            .name(DEFAULT_NAME)
            .eventDate(DEFAULT_EVENT_DATE)
            .eventAddress(DEFAULT_EVENT_ADDRESS)
            .amountOfTickets(DEFAULT_AMOUNT_OF_TICKETS)
            .description(DEFAULT_DESCRIPTION);
        Category category = new Category();
        category.setId(0L);
        event.setCategoryId(category);
        return event;
    }

    public static Order createEntityOrder(EntityManager em) {
        Order order = new Order()
            .orderDate(DEFAULT_ORDER_DATE)
            .isPaid(DEFAULT_IS_PAID);
        return order;
    }

    @Before
    public void initTest() {
        event = createEntityEvent(em);
        order = createEntityOrder(em);
        ticket = createEntityTicket(em);
    }

    @Test
    @Transactional
    public void createTicket() throws Exception {
        int databaseSizeBeforeCreate = ticketRepository.findAll().size();

        //create event for the ticket
        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isCreated());

        // Create the Order
        restOrderMockMvc.perform(post("/api/orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isCreated());

        // Create the Ticket
        restTicketMockMvc.perform(post("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticket)))
            .andExpect(status().isCreated());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeCreate + 1);
        Ticket testTicket = ticketList.get(ticketList.size() - 1);
        assertThat(testTicket.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testTicket.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
    }

    @Test
    @Transactional
    public void createTicketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ticketRepository.findAll().size();

        // Create the Ticket with an existing ID
        ticket.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTicketMockMvc.perform(post("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticket)))
            .andExpect(status().isBadRequest());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTickets() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);

        // Get all the ticketList
        restTicketMockMvc.perform(get("/api/tickets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ticket.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.doubleValue())));
    }

    @Test
    @Transactional
    public void getTicket() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);

        // Get the ticket
        restTicketMockMvc.perform(get("/api/tickets/{id}", ticket.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ticket.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTicket() throws Exception {
        // Get the ticket
        restTicketMockMvc.perform(get("/api/tickets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTicket() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);

        int databaseSizeBeforeUpdate = ticketRepository.findAll().size();

        // Update the ticket
        Ticket updatedTicket = ticketRepository.findById(ticket.getId()).get();
        // Disconnect from session so that the updates on updatedTicket are not directly saved in db
        em.detach(updatedTicket);
        updatedTicket
            .price(UPDATED_PRICE)
            .discount(UPDATED_DISCOUNT);

        restTicketMockMvc.perform(put("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTicket)))
            .andExpect(status().isOk());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeUpdate);
        Ticket testTicket = ticketList.get(ticketList.size() - 1);
        assertThat(testTicket.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testTicket.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingTicket() throws Exception {
        int databaseSizeBeforeUpdate = ticketRepository.findAll().size();

        // Create the Ticket

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTicketMockMvc.perform(put("/api/tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ticket)))
            .andExpect(status().isBadRequest());

        // Validate the Ticket in the database
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTicket() throws Exception {
        // Initialize the database
        ticketRepository.saveAndFlush(ticket);

        int databaseSizeBeforeDelete = ticketRepository.findAll().size();

        // Delete the ticket
        restTicketMockMvc.perform(delete("/api/tickets/{id}", ticket.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ticket> ticketList = ticketRepository.findAll();
        assertThat(ticketList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ticket.class);
        Ticket ticket1 = new Ticket();
        ticket1.setId(1L);
        Ticket ticket2 = new Ticket();
        ticket2.setId(ticket1.getId());
        assertThat(ticket1).isEqualTo(ticket2);
        ticket2.setId(2L);
        assertThat(ticket1).isNotEqualTo(ticket2);
        ticket1.setId(null);
        assertThat(ticket1).isNotEqualTo(ticket2);
    }
}
