import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';
@Injectable()
export class DataService {
    private messageSource = new BehaviorSubject('default');
    currentMessage = this.messageSource.asObservable();

    constructor() {}

    changeMessage(message: string) {
        this.messageSource.next(message);
    }
}
