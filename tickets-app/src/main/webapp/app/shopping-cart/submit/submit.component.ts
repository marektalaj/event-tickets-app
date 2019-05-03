import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { Item } from 'app/shared/model/item.model';

@Component({
    selector: 'jhi-submit',
    templateUrl: './submit.component.html',
    styles: []
})
export class SubmitComponent implements OnInit {
    currentAccount: any;
    items: Item[];
    private total = 0;

    constructor(protected accountService: AccountService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.loadCart();
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
