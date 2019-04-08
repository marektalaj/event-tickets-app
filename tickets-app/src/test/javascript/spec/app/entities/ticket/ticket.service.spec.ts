/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { TicketService } from 'app/entities/ticket/ticket.service';
import { ITicket, Ticket } from 'app/shared/model/ticket.model';
import { Category } from 'app/shared/model/category.model';
import { Event } from 'app/shared/model/event.model';
import { Order } from 'app/shared/model/order.model';
import { User } from 'app/core';
import moment = require('moment');

describe('Service Tests', () => {
    describe('Ticket Service', () => {
        let injector: TestBed;
        let service: TicketService;
        let httpMock: HttpTestingController;
        let elemDefault: ITicket;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TicketService);
            httpMock = injector.get(HttpTestingController);
            var currentDate;
            currentDate = moment();
            elemDefault = new Ticket(
                0,
                new Event(0, new Category(0, 'Koncer'), 'AAAAAAA', currentDate, 'AAAAAAA', 0, 0, 'aaa', 'aaa'),
                new Order(
                    0,
                    new User(
                        1,
                        'adam',
                        'noga',
                        'noga',
                        'npoga',
                        true,
                        'reka',
                        [1, true, 'free'],
                        'asd',
                        new Date(),
                        'sdas',
                        new Date(),
                        'dasdas'
                    ),
                    currentDate,
                    0
                ),
                0,
                0
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Ticket', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Ticket(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Ticket', async () => {
                const returnedFromService = Object.assign(
                    {
                        price: 1,
                        discount: 1
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Ticket', async () => {
                const returnedFromService = Object.assign(
                    {
                        price: 1,
                        discount: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Ticket', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
