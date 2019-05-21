import { Component, OnInit } from '@angular/core';
import { IOrder } from 'app/shared/model/order.model';
import { ActivatedRoute } from '@angular/router';
import { ITicket } from 'app/shared/model/ticket.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { OrderService } from 'app/entities/order';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-order-tickets',
    templateUrl: './history-tickets.component.html',
    styles: []
})
export class HistoryTicketsComponent implements OnInit {
    order: IOrder;
    tickets: ITicket[];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected orderService: OrderService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ order }) => {
            this.order = order;
            this.orderService
                .tickets(this.order.id)
                .pipe(
                    filter((res: HttpResponse<IOrder[]>) => res.ok),
                    map((res: HttpResponse<IOrder[]>) => res.body)
                )
                .subscribe(
                    (res: IOrder[]) => {
                        this.tickets = res;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
