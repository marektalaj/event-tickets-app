import { IOrder } from 'app/shared/model/order.model';
import { IEvent } from 'app/shared/model/event.model';

export interface ITicket {
    id?: number;
    eventId?: IEvent;
    orderId?: IOrder;
    price?: number;
    discount?: number;
}

export class Ticket implements ITicket {
    constructor(public id?: number, public eventId?: IEvent, public orderId?: IOrder, price?: number, public discount?: number) {}
}
