import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ITicket } from 'app/shared/model/ticket.model';
import { TicketService } from './ticket.service';
import { IOrder } from 'app/shared/model/order.model';
import { JhiAlertService } from 'ng-jhipster';
import { OrderService } from 'app/entities/order/order.service';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event/event.service';

@Component({
    selector: 'jhi-ticket-update',
    templateUrl: './ticket-update.component.html'
})
export class TicketUpdateComponent implements OnInit {
    ticket: ITicket;
    isSaving: boolean;
    orders: IOrder[];
    events: IEvent[];

    constructor(
        protected ticketService: TicketService,
        protected eventService: EventService,
        protected activatedRoute: ActivatedRoute,
        protected orderService: OrderService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ticket }) => {
            this.ticket = ticket;
        });
        this.orderService
            .query()
            .pipe(
                filter((res: HttpResponse<IOrder[]>) => res.ok),
                map((res: HttpResponse<IOrder[]>) => res.body)
            )
            .subscribe(
                (res: IOrder[]) => {
                    this.orders = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.eventService
            .query()
            .pipe(
                filter((res: HttpResponse<IEvent[]>) => res.ok),
                map((res: HttpResponse<IEvent[]>) => res.body)
            )
            .subscribe(
                (res: IEvent[]) => {
                    this.events = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ticket.id !== undefined) {
            this.subscribeToSaveResponse(this.ticketService.update(this.ticket));
        } else {
            this.subscribeToSaveResponse(this.ticketService.create(this.ticket));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITicket>>) {
        result.subscribe((res: HttpResponse<ITicket>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
