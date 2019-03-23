/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OrderService } from 'app/entities/order/order.service';
import { IOrder, Order } from 'app/shared/model/order.model';
import { User } from 'app/core';
import { any } from 'codelyzer/util/function';

describe('Service Tests', () => {
    describe('Order Service', () => {
        let injector: TestBed;
        let service: OrderService;
        let httpMock: HttpTestingController;
        let elemDefault: IOrder;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(OrderService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();
            // new User(1,"bolek","Adam","kolek","sdasdasda@gmail.com",false,"12312",new any[1](),"admin",new Date(),"admin",new Date(),"pass")
            elemDefault = new Order(
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
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        orderDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Order', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        orderDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        orderDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Order(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Order', async () => {
                const returnedFromService = Object.assign(
                    {
                        orderDate: currentDate.format(DATE_TIME_FORMAT),
                        isPaid: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        orderDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Order', async () => {
                const returnedFromService = Object.assign(
                    {
                        orderDate: currentDate.format(DATE_TIME_FORMAT),
                        isPaid: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        orderDate: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a Order', async () => {
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
