import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubmitComponent } from './submit/submit.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'shopping-cart',
                loadChildren: './shopping-cart/shopping-cart.module#TicketsShoppingCartModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [SubmitComponent, PaymentComponent, ConfirmationComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketShoppingModule {}
