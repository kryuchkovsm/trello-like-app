// Ticket
// _id: string;
// title: string;
// listId: string;
// boardId: string; // for simplify search from DB... may be temporary
// order: number;

import { Ticket } from '../components/classes/ticket'

export const TICKETS: Ticket[] = [
    {   _id: 'ticket1',
        title: 'walk a dog',
        boardId: 'board1',
        listId: '111',
        order: 0,
    },
    {   _id: 'ticket2',
        title: 'eat pizza',
        boardId: 'board1',
        listId: '111',
        order: 1,
    },
    {   _id: 'ticket3',
        title: 'burn the house',
        boardId: 'board1',
        listId: '111',
        order: 2,
    },
    {   _id: 'ticket4',
        title: 'fly to the sun',
        boardId: 'board1',
        listId: '111',
        order: 3,
    },
    {   _id: 'ticket2221',
        title: 'kick some asses',
        boardId: 'board1',
        listId: '222',
        order: 0,
    },
    {   _id: 'ticket3331',
        title: 'play baseball',
        boardId: 'board1',
        listId: '333',
        order: 0,
    },
    {   _id: 'ticket44441',
        title: 'dig a tonnel',
        boardId: 'board1',
        listId: '4444',
        order: 0,
    },
    {   _id: 'ticket44442',
        title: 'tell a story',
        boardId: 'board1',
        listId: '4444',
        order: 1,
    },
    {   _id: 'ticket44443',
        title: 'bathe dinosaur',
        boardId: 'board1',
        listId: '4444',
        order: 2,
    }
]
