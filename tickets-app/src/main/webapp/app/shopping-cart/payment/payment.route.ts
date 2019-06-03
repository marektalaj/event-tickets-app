import { Route } from '@angular/router';
import { PaymentComponent } from 'app/shopping-cart/payment/payment.component';
import { UserRouteAccessService } from 'app/core';

export const paymentRoute: Route = {
    path: 'payment',
    component: PaymentComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'payment.title'
    },
    canActivate: [UserRouteAccessService]
};
