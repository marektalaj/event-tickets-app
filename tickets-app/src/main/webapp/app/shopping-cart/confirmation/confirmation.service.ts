import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {
    constructor(private http: HttpClient) {}

    sentMail(account: any, messege: string): Observable<any> {
        let headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const body = new HttpParams().set('user', account).set('messege', messege);

        return this.http.post(SERVER_API_URL + 'api/account/ticket-confirmation', body, headers);
    }
}
