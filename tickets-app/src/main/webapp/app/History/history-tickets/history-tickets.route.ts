import { ActivatedRouteSnapshot, Resolve, Route, RouterStateSnapshot } from '@angular/router';
import { HistoryTicketsComponent } from 'app/History/history-tickets/history-tickets.component';
import { IOrder, Order } from 'app/shared/model/order.model';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs/index';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderService } from 'app/entities/order/order.service';

@Injectable({ providedIn: 'root' })
export class OrderResolve implements Resolve<IOrder> {
    constructor(private service: OrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Order>) => response.ok),
                map((order: HttpResponse<Order>) => order.body)
            );
        }
        return of(new Order());
    }
}

export const historyTicketsRoute: Route = {
    path: 'history-tickets/:id',
    component: HistoryTicketsComponent,
    resolve: {
        order: OrderResolve
    },
    data: {
        authorities: [],
        pageTitle: 'order-tickets.title'
    }
};
