import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from 'app/shopping-cart/shopping-cart/shopping-cart.component';
import { JhiLanguageService } from 'ng-jhipster';
import { TicketsSharedModule } from 'app/shared';
import { shoppingCartRoute } from 'app/shopping-cart/shopping-cart/shopping-cart.route';
import { HistoryComponent } from 'app/history/history/history.component';
import { historyRoute } from 'app/history/history/history.route';
import { PaymentStatusPipe } from 'app/History/payment-status.pipe';

const ENTITY_STATES = [historyRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HistoryComponent, PaymentStatusPipe],
    entryComponents: [HistoryComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsHistoryModule {}
