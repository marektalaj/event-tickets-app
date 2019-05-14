import { IUser, User } from 'app/shared/model/user.model';
import { ITicket, Ticket } from 'app/shared/model/ticket.model';

export interface IConfirmation {
    user?: IUser;
    tickets?: ITicket[];
}

export class Confirmation implements IConfirmation {
    constructor(public user?: User, public tickets?: Ticket[]) {}
}
