import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';

export const shoppingCartRoute: Route = {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'shopping-cart.title'
    }
};
