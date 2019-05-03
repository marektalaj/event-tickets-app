import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { shoppingCartRoute } from 'app/shopping-cart/shopping-cart/shopping-cart.route';
import { JhiLanguageService } from 'ng-jhipster';
import { TicketsSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { SubmitComponent } from 'app/shopping-cart/submit/submit.component';
import { submitRoute } from 'app/shopping-cart/submit/submit.route';

const ENTITY_STATES = [submitRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SubmitComponent],
    entryComponents: [SubmitComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsSubmitModule {}
