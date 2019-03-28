import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from './event.service';
import { CategoryService } from 'app/entities/category/category.service';
import { ICategory } from 'app/shared/model/category.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-event-update',
    templateUrl: './event-update.component.html'
})
export class EventUpdateComponent implements OnInit {
    event: IEvent;
    isSaving: boolean;
    eventDate: string;
    categories: ICategory[];
    selected: ICategory;

    constructor(
        protected eventService: EventService,
        protected activatedRoute: ActivatedRoute,
        protected categoryService: CategoryService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ event }) => {
            this.event = event;
            this.event.categoryId = event.categoryId;
            this.eventDate = this.event.eventDate != null ? this.event.eventDate.format(DATE_TIME_FORMAT) : null;
            this.selected = event.categoryId;
            console.log(this.selected);
        });
        this.categoryService
            .query()
            .pipe(
                filter((res: HttpResponse<ICategory[]>) => res.ok),
                map((res: HttpResponse<ICategory[]>) => res.body)
            )
            .subscribe(
                (res: ICategory[]) => {
                    this.categories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        console.log(this.selected);
        console.log(this.event.categoryId);
        // this.event.categoryId=this.categories[1];

        this.event.eventDate = this.eventDate != null ? moment(this.eventDate, DATE_TIME_FORMAT) : null;
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(this.eventService.create(this.event));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvent>>) {
        result.subscribe((res: HttpResponse<IEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
