import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IConfirmation } from 'app/shared/model/confirmation.model';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {
    constructor(private http: HttpClient) {}

    sentMail(confirmation: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/account/ticket-confirmation', confirmation);
    }
}
