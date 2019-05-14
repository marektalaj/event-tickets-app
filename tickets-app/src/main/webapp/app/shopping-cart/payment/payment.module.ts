import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { TicketsSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from 'app/shopping-cart/payment/payment.component';
import { paymentRoute } from 'app/shopping-cart/payment/payment.route';
import { NgxPayPalModule } from 'ngx-paypal';
import { DataService } from 'app/shopping-cart/data.service';

const ENTITY_STATES = [paymentRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES), NgxPayPalModule],
    declarations: [PaymentComponent],
    entryComponents: [PaymentComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }, DataService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsPaymentModule {}
