import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { TicketsSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from 'app/shopping-cart/payment/payment.component';
import { paymentRoute } from 'app/shopping-cart/payment/payment.route';

const ENTITY_STATES = [paymentRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PaymentComponent],
    entryComponents: [PaymentComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsPaymentModule {}
