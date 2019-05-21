import { ShoppingCartComponent } from 'app/shopping-cart/shopping-cart/shopping-cart.component';
import { Route } from '@angular/router';
import { HistoryComponent } from 'app/history/history/history.component';

export const historyRoute: Route = {
    path: 'history',
    component: HistoryComponent,
    data: {
        authorities: [],
        pageTitle: 'history.title'
    }
};
