import { List } from '../components/classes/list'
import { Ticket } from '../components/classes/ticket'

export const LISTS: List[] = [
    {   _id: '111',
        title: 'to do',
        boardId: 'board1',
        order: 0,
        tickets: []
    },
    {   _id: '222',
        title: 'in progress',
        boardId: 'board1',
        order: 1,
        tickets: []
    },
    {   _id: '333',
        title: 'done',
        boardId: 'board1',
        order: 2,        
        tickets: []
    },
    {   _id: '4444',
        title: 'done',
        boardId: 'board1',
        order: 3,
        tickets: []
    }
]