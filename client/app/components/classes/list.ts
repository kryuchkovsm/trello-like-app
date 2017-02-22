import { Ticket } from './ticket';

export class List {
    _id: string;
    title: string;
    boardId: string;
    order: number;
    tickets: Ticket[];
}