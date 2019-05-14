import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { ConfirmationService } from 'app/shopping-cart/confirmation/confirmation.service';
import { Confirmation, IConfirmation } from 'app/shared/model/confirmation.model';
import { DataService } from 'app/shopping-cart/data.service';

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
    messege = 'twoje bileciki';
    confirmation: IConfirmation;
    element: HTMLElement;

    isPaidSuccessful: string;

    constructor(
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected orderService: OrderService,
        protected eventService: EventService,
        protected ticketService: TicketService,
        private alertService: JhiAlertService,
        protected confirmationService: ConfirmationService,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.dataService.currentMessage.subscribe(message => {
            this.isPaidSuccessful = message;
            console.log(this.isPaidSuccessful);
            this.accountService.identity().then(account => {
                this.currentAccount = account;

                if (this.isPaidSuccessful === 'no' || localStorage.getItem('cart') == null) {
                    this.element = document.getElementById('error-messege') as HTMLElement;
                    this.element.innerText = 'Error in payment';
                    console.log('płatność niepomyślna');
                } else {
                    console.log('płatność pomyślna');
                    const currentDate = moment();
                    const order = new Order(undefined, this.currentAccount, currentDate, 1);
                    this.orderService.create(order).subscribe(
                        (res: HttpResponse<IOrder>) => {
                            this.order = res.body;
                            this.loadCart();
                            let howManyTickets = 0;
                            this.items.forEach((item, index) => {
                                howManyTickets += item.quantity;
                            });
                            this.items.forEach((item, index) => {
                                for (let i = 0; i < item.quantity; i++) {
                                    item.event.amountOfTickets--;
                                }
                                item.event.eventDate = item.event.eventDate != null ? moment(item.event.eventDate, DATE_TIME_FORMAT) : null;
                                this.eventService.update(item.event).subscribe();
                                for (let i = 0; i < item.quantity; i++) {
                                    let ticket = new Ticket(undefined, item.event, this.order, item.event.price);
                                    this.ticketService.create(ticket).subscribe(
                                        (response: HttpResponse<ITicket>) => {
                                            this.tickets.push({
                                                id: response.body.id,
                                                eventId: response.body.eventId,
                                                orderId: response.body.orderId,
                                                price: response.body.price,
                                                discount: response.body.discount
                                            });
                                            if (this.tickets.length == howManyTickets) {
                                                let confirmation = new Confirmation(this.currentAccount, this.tickets);
                                                this.confirmationService.sentMail(confirmation).subscribe();
                                            }
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
