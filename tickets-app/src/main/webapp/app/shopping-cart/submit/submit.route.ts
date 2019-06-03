import { Route } from '@angular/router';
import { SubmitComponent } from 'app/shopping-cart/submit/submit.component';
import { UserRouteAccessService } from 'app/core';

export const submitRoute: Route = {
    path: 'submit',
    component: SubmitComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'submit.title'
    },
    canActivate: [UserRouteAccessService]
};
