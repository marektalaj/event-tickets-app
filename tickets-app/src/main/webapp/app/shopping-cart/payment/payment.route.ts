import { Route } from '@angular/router';
import { PaymentComponent } from 'app/shopping-cart/payment/payment.component';

export const paymentRoute: Route = {
    path: 'payment',
    component: PaymentComponent,
    data: {
        authorities: [],
        pageTitle: 'payment.title'
    }
};
