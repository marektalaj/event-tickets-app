import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-payment',
    templateUrl: './payment.component.html',
    styles: []
})
export class PaymentComponent implements OnInit {
    currentAccount: any;
    paymentDone = 1;
    paymentNotDone = 0;

    constructor(protected accountService: AccountService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }
}
