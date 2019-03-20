import { Moment } from 'moment';

export interface IOrder {
    id?: number;
    orderDate?: Moment;
    isPaid?: number;
}

export class Order implements IOrder {
    constructor(public id?: number, public orderDate?: Moment, public isPaid?: number) {}
}
