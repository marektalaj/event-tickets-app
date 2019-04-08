package org.kupbilet.tickets.repository;

import org.kupbilet.tickets.domain.EventLite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface EventLiteRepository extends JpaRepository<EventLite, Long> {
}
