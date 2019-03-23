import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';

export interface IEvent {
    id?: number;
    categoryId?: ICategory;
    name?: string;
    eventDate?: Moment;
    eventAddress?: string;
    amountOfTickets?: number;
    description?: string;
}

export class Event implements IEvent {
    constructor(
        public id?: number,
        public categoryId?: ICategory,
        public name?: string,
        public eventDate?: Moment,
        public eventAddress?: string,
        public amountOfTickets?: number,
        public description?: string
    ) {}
}
