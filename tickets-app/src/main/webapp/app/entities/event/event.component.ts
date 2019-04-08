import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEvent } from 'app/shared/model/event.model';
import { AccountService } from 'app/core';
import { EventService } from './event.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
    selector: 'jhi-event',
    templateUrl: './event.component.html'
})
export class EventComponent implements OnInit, OnDestroy {
    events: IEvent[];
    categories: ICategory[];
    selectedCategory: any;
    currentAccount: any;
    eventSubscriber: Subscription;
    searchTerm: string;

    constructor(
        protected eventService: EventService,
        protected categoryService: CategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAllEvents() {
        this.eventService
            .query()
            .pipe(
                filter((res: HttpResponse<IEvent[]>) => res.ok),
                map((res: HttpResponse<IEvent[]>) => res.body)
            )
            .subscribe(
                (res: IEvent[]) => {
                    this.events = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    getAllCategories() {
        this.categoryService
            .query()
            .pipe(
                filter((res: HttpResponse<IEvent[]>) => res.ok),
                map((res: HttpResponse<IEvent[]>) => res.body)
            )
            .subscribe(
                (res: ICategory[]) => {
                    this.categories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAllEvents();
        this.getAllCategories();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEvent) {
        return item.id;
    }

    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe('eventListModification', response => this.loadAllEvents());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
