import { Route } from '@angular/router';
import { ConfirmationComponent } from 'app/shopping-cart/confirmation/confirmation.component';

export const confirmationRoute: Route = {
    path: 'confirmation',
    component: ConfirmationComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'confirmation.title'
    }
};
