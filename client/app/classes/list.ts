import { Ticket } from './ticket';

export class List {
    _id: number;
    name: string;
    boardId: string;
    order: number;
    tickets: Ticket[];
}