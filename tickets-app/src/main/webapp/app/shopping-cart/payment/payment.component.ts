import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { DataService } from 'app/shopping-cart/data.service';
import { Item } from 'app/shared/model/item.model';

@Component({
    selector: 'jhi-payment',
    templateUrl: './payment.component.html',
    styles: []
})
export class PaymentComponent implements OnInit {
    currentAccount: any;
    items: Item[];
    total: number;

    public isPaidSuccessful: string = 'no';

    public showSuccess: boolean = false;
    public showCancel: boolean = false;
    public showError: boolean = false;
    public payPalConfig?: IPayPalConfig;

    constructor(protected accountService: AccountService, protected router: Router, private dataService: DataService) {}

    ngOnInit() {
        this.loadCart();
        this.accountService.identity().then(account => {
            this.initConfig(this.total.toString());
            this.currentAccount = account;
        });
    }

    private initConfig(price: string): void {
        this.payPalConfig = {
            currency: 'PLN',
            clientId: 'sb',
            createOrderOnClient: data =>
                <ICreateOrderRequest>{
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            amount: {
                                currency_code: 'PLN',
                                value: price,
                                breakdown: {
                                    item_total: {
                                        currency_code: 'PLN',
                                        value: price
                                    }
                                }
                            },
                            items: [
                                {
                                    name: 'Enterprise Subscription',
                                    quantity: '1',
                                    category: 'DIGITAL_GOODS',
                                    unit_amount: {
                                        currency_code: 'PLN',
                                        value: price
                                    }
                                }
                            ]
                        }
                    ]
                },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then((details: any) => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });
            },
            onClientAuthorization: data => {
                console.log(
                    'onClientAuthorization - you should probably inform your server about completed transaction at this point',
                    data
                );
                this.showSuccess = true;
                this.isPaidSuccessful = 'yes';
                this.dataService.changeMessage(this.isPaidSuccessful);
                this.router.navigate(['/confirmation']);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                this.showCancel = true;
            },
            onError: err => {
                console.log('OnError', err);
                this.showError = true;
                this.isPaidSuccessful = 'no';
                this.dataService.changeMessage(this.isPaidSuccessful);
                this.router.navigate(['/confirmation']);
            },
            onClick: () => {
                console.log('onClick');
                this.resetStatus();
            }
        };
    }

    private resetStatus(): void {
        this.showError = false;
        this.showSuccess = false;
        this.showCancel = false;
    }

    private loadCart(): void {
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
