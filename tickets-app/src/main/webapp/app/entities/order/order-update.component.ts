import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { AccountService, User, UserService } from 'app/core';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-order-update',
    templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
    order: IOrder;
    isSaving: boolean;
    orderDate: string;
    users: User[];

    constructor(
        protected orderService: OrderService,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
        private userService: UserService,
        private alertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ order }) => {
            this.order = order;
            this.orderDate = this.order.orderDate != null ? this.order.orderDate.format(DATE_TIME_FORMAT) : null;
        });
        this.userService
            .query()
            .subscribe(
                (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.order.orderDate = this.orderDate != null ? moment(this.orderDate, DATE_TIME_FORMAT) : null;
        if (this.order.id !== undefined) {
            this.subscribeToSaveResponse(this.orderService.update(this.order));
        } else {
            this.subscribeToSaveResponse(this.orderService.create(this.order));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>) {
        result.subscribe((res: HttpResponse<IOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    private onSuccess(data, headers) {
        this.users = data;
    }
}
