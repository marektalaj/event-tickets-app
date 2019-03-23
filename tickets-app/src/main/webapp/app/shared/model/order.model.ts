import { Moment } from 'moment';
import { IUser, User } from 'app/shared/model/user.model';

export interface IOrder {
    id?: number;
    clientId?: IUser;
    orderDate?: Moment;
    isPaid?: number;
}

export class Order implements IOrder {
    constructor(public id?: number, public clientId?: User, public orderDate?: Moment, public isPaid?: number) {}
}
