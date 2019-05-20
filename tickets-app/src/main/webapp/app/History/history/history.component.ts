import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'app/shared/model/order.model';
import { JhiAlertService } from 'ng-jhipster';
import { AccountService, UserService } from 'app/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'jhi-history',
    templateUrl: './history.component.html',
    styles: []
})
export class HistoryComponent implements OnInit {
    orders: IOrder[];
    currentAccount: any;

    constructor(
        private alertService: JhiAlertService,
        private userService: UserService,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.userService
                .orders(this.currentAccount.id)
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
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
