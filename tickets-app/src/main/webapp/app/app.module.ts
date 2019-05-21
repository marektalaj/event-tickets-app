import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { TicketsSharedModule } from 'app/shared';
import { TicketsCoreModule } from 'app/core';
import { TicketsAppRoutingModule } from './app-routing.module';
import { TicketsHomeModule } from './home/home.module';
import { TicketsAccountModule } from './account/account.module';
import { TicketsEntityModule } from './entities/entity.module';

import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { TicketShoppingModule } from 'app/shopping-cart/shopping.module';
import { TicketsShoppingCartModule } from 'app/shopping-cart/shopping-cart/shopping-cart.module';
import { TicketsSubmitModule } from 'app/shopping-cart/submit/submit.module';
import { TicketsConfirmationModule } from 'app/shopping-cart/confirmation/confirmation.module';
import { TicketsPaymentModule } from 'app/shopping-cart/payment/payment.module';
import { HistoryComponent } from './History/history/history.component';
import { TicketsHistoryModule } from 'app/History/history/history.module';
import { HistoryTicketsComponent } from './History/history-tickets/history-tickets.component';
import { TicketsToShowModule } from 'app/History/history-tickets/history-tickets.module';

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        TicketsSharedModule.forRoot(),
        TicketsCoreModule,
        TicketsHomeModule,
        TicketsAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        TicketsEntityModule,
        TicketsToShowModule,
        TicketsHistoryModule,
        TicketsConfirmationModule,
        TicketsPaymentModule,
        TicketsShoppingCartModule,
        TicketsSubmitModule,
        TicketsHistoryModule,
        TicketsAppRoutingModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        HistoryComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class TicketsAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
