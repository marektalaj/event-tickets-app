import { Moment } from 'moment';

export interface IEvent {
    id?: number;
    name?: string;
    eventDate?: Moment;
    eventAddress?: string;
    amountOfTickets?: number;
    description?: string;
}

export class Event implements IEvent {
    constructor(
        public id?: number,
        public name?: string,
        public eventDate?: Moment,
        public eventAddress?: string,
        public amountOfTickets?: number,
        public description?: string
    ) {}
}
