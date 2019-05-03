import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { shoppingCartRoute } from 'app/shopping-cart/shopping-cart/shopping-cart.route';
import { ShoppingCartComponent } from 'app/shopping-cart/shopping-cart/shopping-cart.component';
import { TicketsSharedModule } from 'app/shared';

const ENTITY_STATES = [shoppingCartRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ShoppingCartComponent],
    entryComponents: [ShoppingCartComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsShoppingCartModule {}
