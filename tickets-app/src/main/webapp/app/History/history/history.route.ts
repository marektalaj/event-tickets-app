import { ShoppingCartComponent } from 'app/shopping-cart/shopping-cart/shopping-cart.component';
import { Route } from '@angular/router';
import { HistoryComponent } from 'app/history/history/history.component';
import { UserRouteAccessService } from 'app/core';

export const historyRoute: Route = {
    path: 'history',
    component: HistoryComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'history.title'
    },
    canActivate: [UserRouteAccessService]
};
