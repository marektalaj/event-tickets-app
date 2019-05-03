import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { IEvent } from 'app/shared/model/event.model';
import { ITicket } from 'app/shared/model/ticket.model';
import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from 'app/entities/order/order.service';
import { JhiAlertService } from 'ng-jhipster';
import { TicketService } from 'app/entities/ticket/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'app/shared/model/item.model';

@Component({
    selector: 'jhi-confirmation',
    templateUrl: './confirmation.component.html',
    styles: []
})
export class ConfirmationComponent implements OnInit {
    currentAccount: any;
    items: Item[];
    tickets: ITicket[];
    order: IOrder;
    paymentStatus: string;

    constructor(
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected orderService: OrderService,
        protected ticketService: TicketService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.activatedRoute.params.subscribe(params => {
            this.paymentStatus = params['paymentStatus'];

            if (this.paymentStatus === '0') {
                console.log('płatność niepomyślna');
            } else {
                console.log('płatność pomyślna');
            }
        });
    }
}
