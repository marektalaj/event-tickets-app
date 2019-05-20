import { Component, OnInit } from '@angular/core';
import { IOrder } from 'app/shared/model/order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-order-tickets',
    templateUrl: './order-tickets.component.html',
    styles: []
})
export class HistoryTicketsComponent implements OnInit {
    order: IOrder;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ order }) => {
            this.order = order;
        });
    }
}
