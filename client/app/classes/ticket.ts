export class Ticket {
    _id: number;
    text: string;
    listId: number;
    boardId: number; // for simplify search from DB... may be temporary
    order: number;
}