import { Moment } from 'moment';

export interface IUser {
    id?: number;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    imageUrl?: string;
    resetDate?: Moment;
}

export class User implements IUser {
    constructor(
        public id?: number,
        public login?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public activated?: boolean,
        public langKey?: string,
        public imageUrl?: string,
        public resetDate?: Moment
    ) {}
}
