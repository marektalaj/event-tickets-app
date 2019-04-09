import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { TicketsSharedModule } from 'app/shared';
import {
    EventComponent,
    EventDetailComponent,
    EventUpdateComponent,
    EventDeletePopupComponent,
    EventDeleteDialogComponent,
    eventRoute,
    eventPopupRoute
} from './';
import { EventSearchPipe } from './event-search.pipe';
import { EventSearchCategoryPipe } from './event-search-category.pipe';

const ENTITY_STATES = [...eventRoute, ...eventPopupRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        EventComponent,
        EventDetailComponent,
        EventUpdateComponent,
        EventDeleteDialogComponent,
        EventDeletePopupComponent,
        EventSearchPipe,
        EventSearchCategoryPipe
    ],
    entryComponents: [EventComponent, EventUpdateComponent, EventDeleteDialogComponent, EventDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsEventModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
