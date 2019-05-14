import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { TicketsSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from 'app/shopping-cart/confirmation/confirmation.component';
import { confirmationRoute } from 'app/shopping-cart/confirmation/confirmation.route';
import { DataService } from 'app/shopping-cart/data.service';

const ENTITY_STATES = [confirmationRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ConfirmationComponent],
    entryComponents: [ConfirmationComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }, DataService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsConfirmationModule {}
