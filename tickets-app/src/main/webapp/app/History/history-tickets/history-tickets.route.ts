import { Route } from '@angular/router';
import { HistoryTicketsComponent } from 'app/History/history-tickets/history-tickets.component';

export const historyTicketsRoute: Route = {
    path: 'history-tickets/:id',
    component: HistoryTicketsComponent,
    data: {
        authorities: [],
        pageTitle: 'order-tickets.title'
    }
};
