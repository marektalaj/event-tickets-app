import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';

export interface IEvent {
    id?: number;
    categoryId?: ICategory;
    name?: string;
    eventDate?: Moment;
    eventAddress?: string;
    price?: number;
    amountOfTickets?: number;
    description?: string;
    image?: string;
}

export class Event implements IEvent {
    constructor(
        public id?: number,
        public categoryId?: ICategory,
        public name?: string,
        public eventDate?: Moment,
        public eventAddress?: string,
        public price?: number,
        public amountOfTickets?: number,
        public description?: string,
        public image?: string
    ) {}
}
