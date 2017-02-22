export class Ticket {
    _id: string;
    title: string;
    listId: string;
    boardId: string; // for simplify search from DB... may be temporary
    order: number;
}