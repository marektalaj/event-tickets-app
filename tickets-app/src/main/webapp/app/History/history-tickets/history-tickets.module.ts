import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { HistoryTicketsComponent } from 'app/History/history-tickets/history-tickets.component';
import { JhiLanguageService } from 'ng-jhipster';
import { historyTicketsRoute } from 'app/History/history-tickets/history-tickets.route';
import { PaymentStatusPipe } from 'app/History/payment-status.pipe';

const ENTITY_STATES = [historyTicketsRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HistoryTicketsComponent],
    entryComponents: [HistoryTicketsComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsToShowModule {}
