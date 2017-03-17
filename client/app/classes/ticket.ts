export class Ticket {
    _id:            string;
    text:           string;
    description:    string;
    listId:         string;
    boardId:        string; // for simplify search from DB... may be temporary
    order:          number;
    lastUpdate:     any;
}