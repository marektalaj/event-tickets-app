import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { ITicket, Ticket } from 'app/shared/model/ticket.model';
import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from 'app/entities/order/order.service';
import { JhiAlertService } from 'ng-jhipster';
import { TicketService } from 'app/entities/ticket/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'app/shared/model/item.model';
import moment = require('moment');
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventService } from 'app/entities/event';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

@Component({
    selector: 'jhi-confirmation',
    templateUrl: './confirmation.component.html',
    styles: []
})
export class ConfirmationComponent implements OnInit {
    currentAccount: any;
    items: Item[];
    total: number;
    tickets: ITicket[] = [];
    order: IOrder;
    paymentStatus: string;

    constructor(
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected orderService: OrderService,
        protected eventService: EventService,
        protected ticketService: TicketService,
        private alertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.activatedRoute.params.subscribe(params => {
                this.paymentStatus = params['paymentStatus'];

                if (this.paymentStatus === '0') {
                    console.log('płatność niepomyślna');
                } else {
                    console.log('płatność pomyślna');
                    const currentDate = moment();
                    const order = new Order(undefined, this.currentAccount, currentDate, 1);
                    this.orderService.create(order).subscribe(
                        (res: HttpResponse<IOrder>) => {
                            this.order = res.body;
                            this.loadCart();
                            this.items.forEach((item, index) => {
                                for (let i = 0; i < item.quantity; i++) {
                                    item.event.amountOfTickets--;
                                    item.event.eventDate =
                                        item.event.eventDate != null ? moment(item.event.eventDate, DATE_TIME_FORMAT) : null;
                                    this.eventService.update(item.event).subscribe();
                                    let ticket = new Ticket(undefined, item.event, this.order, item.event.price);
                                    this.ticketService.create(ticket).subscribe(
                                        (response: HttpResponse<ITicket>) => {
                                            console.log(response.body);
                                            this.tickets.push({
                                                id: response.body.id,
                                                eventId: response.body.eventId,
                                                orderId: response.body.orderId,
                                                price: response.body.price,
                                                discount: response.body.discount
                                            });
                                            localStorage.clear();
                                        },
                                        (response: HttpErrorResponse) => this.onError(response.message)
                                    );
                                }
                            });
                        },
                        (res: HttpErrorResponse) => this.onError(res)
                    );
                }
            });
        });
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    loadCart(): void {
        this.total = 0;
        this.items = [];
        const cart = JSON.parse(localStorage.getItem('cart'));
        for (let i = 0; i < cart.length; i++) {
            const item = JSON.parse(cart[i]);
            this.items.push({
                event: item.event,
                quantity: item.quantity
            });
            this.total += item.event.price * item.quantity;
        }
    }
}
