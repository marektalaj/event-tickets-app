import { Route } from '@angular/router';
import { SubmitComponent } from 'app/shopping-cart/submit/submit.component';

export const submitRoute: Route = {
    path: 'submit',
    component: SubmitComponent,
    data: {
        authorities: [],
        pageTitle: 'submit.title'
    }
};
