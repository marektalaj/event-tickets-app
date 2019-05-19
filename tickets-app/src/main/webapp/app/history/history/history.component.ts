import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-history',
    templateUrl: './history.component.html',
    styles: []
})
export class HistoryComponent implements OnInit {
    constructor(protected router: Router) {}

    ngOnInit() {}
}
