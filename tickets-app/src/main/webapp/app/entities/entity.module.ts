import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'order',
                loadChildren: './order/order.module#TicketsOrderModule'
            },
            {
                path: 'ticket',
                loadChildren: './ticket/ticket.module#TicketsTicketModule'
            },
            {
                path: 'event',
                loadChildren: './event/event.module#TicketsEventModule'
            },
            {
                path: 'category',
                loadChildren: './category/category.module#TicketsCategoryModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsEntityModule {}
