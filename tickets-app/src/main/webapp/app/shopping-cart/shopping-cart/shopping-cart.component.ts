import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { VERSION } from 'app/app.constants';
import { IEvent } from 'app/shared/model/event.model';
import { Item } from 'app/shared/model/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'app/entities/event/event.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'jhi-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styles: []
})
export class ShoppingCartComponent implements OnInit {
    private items: Item[] = [];
    private total = 0;
    currentAccount: any;

    constructor(
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected jhiAlertService: JhiAlertService,
        protected eventService: EventService,
        protected router: Router
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                let tempEvent: IEvent;
                this.eventService
                    .find(id)
                    .pipe(
                        filter((res: HttpResponse<IEvent>) => res.ok),
                        map((res: HttpResponse<IEvent>) => res.body)
                    )
                    .subscribe(
                        (res: IEvent) => {
                            tempEvent = res;
                            this.doSmtng(id, tempEvent);
                        },
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
            } else {
                this.loadCart();
            }
        });
    }

    doSmtng(id: number, tempEvent: IEvent) {
        if (id) {
            const item: Item = {
                event: tempEvent,
                quantity: 1
            };
            // if (localStorage.getItem('cart') == null) {
            if (localStorage.getItem('cart') == null) {
                let cart: any = [];
                cart.push(JSON.stringify(item));
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                let cart: any = JSON.parse(localStorage.getItem('cart'));
                let index = -1;
                for (let i = 0; i < cart.length; i++) {
                    let item: Item = JSON.parse(cart[i]);
                    if (item.event.id == id) {
                        index = i;
                        break;
                    }
                }
                if (index == -1) {
                    cart.push(JSON.stringify(item));
                    localStorage.setItem('cart', JSON.stringify(cart));
                } else {
                    const item: Item = JSON.parse(cart[index]);
                    item.quantity += 1;
                    cart[index] = JSON.stringify(item);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            }
            this.loadCart();
        } else {
            if (localStorage.getItem('cart') == null) {
            } else {
                this.loadCart();
            }
        }
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

    remove(id: number): void {
        const cart: any = JSON.parse(localStorage.getItem('cart'));
        const index = -1;
        for (let i = 0; i < cart.length; i++) {
            const item: Item = JSON.parse(cart[i]);
            if (item.event.id === id) {
                cart.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.items.forEach((itemToRemove, index) => {
            if (itemToRemove.event.id == id) {
                if (itemToRemove.quantity > 1) {
                    this.items[index].quantity--;
                } else {
                    this.items.splice(index, 1);
                }
            }
        });
        this.loadCart();
        if (this.items.length == 0) {
            localStorage.clear();
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    submit() {
        if (localStorage.getItem('cart') == null) {
            alert('Your shopping cart is empty');
        } else {
            this.router.navigate(['/submit']);
        }
    }
}
