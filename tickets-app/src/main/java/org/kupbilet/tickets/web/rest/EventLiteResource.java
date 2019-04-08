package org.kupbilet.tickets.web.rest;

import org.kupbilet.tickets.domain.Event;
import org.kupbilet.tickets.domain.EventLite;
import org.kupbilet.tickets.repository.EventLiteRepository;
import org.kupbilet.tickets.repository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for managing Event.
 */
@RestController
@RequestMapping("/api")
public class EventLiteResource {
    private final Logger log = LoggerFactory.getLogger(EventResource.class);
    private static final String ENTITY_NAME = "event";

    private final EventLiteRepository eventRepository;

    public EventLiteResource(EventLiteRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    /**
     * GET  /events : get all the events.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of events in body
     */
    @GetMapping("/eventsLite")
    public List<EventLite> getAllEvents() {
        log.debug("REST request to get all Events");
        return eventRepository.findAll();
    }
}
