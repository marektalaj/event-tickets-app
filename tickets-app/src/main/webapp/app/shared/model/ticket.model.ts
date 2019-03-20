export interface ITicket {
    id?: number;
    price?: number;
    discount?: number;
}

export class Ticket implements ITicket {
    constructor(public id?: number, public price?: number, public discount?: number) {}
}
