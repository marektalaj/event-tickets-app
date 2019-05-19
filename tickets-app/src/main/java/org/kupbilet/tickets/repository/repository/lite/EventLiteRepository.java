package org.kupbilet.tickets.repository.repository.lite;

import org.kupbilet.tickets.domain.domain.lite.EventLite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface EventLiteRepository extends JpaRepository<EventLite, Long> {
}
