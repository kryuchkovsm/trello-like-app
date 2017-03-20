import { 
    Component, 
    Input, 
    Output, 
    OnInit, 
    OnDestroy, 
    EventEmitter } from '@angular/core';

import { DataService }              from '../../services/data.service'
import { DragulaService }           from 'ng2-dragula'
import { Ticket }                   from '../../classes/ticket'
import { List }                     from '../../classes/list'

@Component({
    moduleId: module.id,
    selector: 'list-component',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    viewProviders: [DragulaService],
})

export class ListComponent implements OnInit, OnDestroy{
    @Input() list: List;
    @Output() removeListFromBoard$: EventEmitter<string> = new EventEmitter<string>();
    
    // dragula debug message
    message : string;

    // UI transform from span to input
    addingTicket: boolean;
    addingTicketText: string;

    editingListName: boolean;
    editingListNameBuffer: string;
    
    // tickets in current list
    tickets: Ticket[];

    constructor (
        private dataService: DataService,
        private dragulaService: DragulaService
    ) {

        
        
        // const bag: any = this.dragulaService.find('dragula-tickets');
        // console.log('dragula-tickets bag from lists.component:');
        // console.log(bag);
        // console.log('"dragula-tickets" bag from lists.component')
        // console.log(bag);

        dragulaService.dropModel.subscribe((value) => {
            console.log('============= dragulasevice DROPmODEL in list.component.ts =============');
            // console.log(value);
            // this.onDrop(value.slice(1));
        });
        
        dragulaService.drop.subscribe((value) => {
            console.log('--------------- dragulasevice "DROP" in list.component.ts ----------------');
            // console.log(value);
            // console.log(`drop: ${value[0]}`);
            // this.onDrop(value.slice(1));
        });
    }

    ngOnInit(): void {
        this.dataService.getTickets(this.list._id)
            .subscribe(tickets => {
                this.tickets = tickets;
            })

        if (this.list._id) {
            this.dragulaService.setOptions(this.list._id, {  });
        }
    }


    // ============================== ADD TICKET SECTION =============================
    
    public enableAddTicket(){
        this.addingTicket = true;
    }

    addTicket() {
        this.tickets = this.tickets || [];
        let newTicket = <Ticket>{
            // _id: +new Date(),
            listId: this.list._id,
            boardId: this.list.boardId,
            text: this.addingTicketText,
            order: (this.tickets.length + 1) * 1000,
        };
        this.dataService.addTicket(newTicket)
            .subscribe(ticket => {
                this.tickets.push(ticket);
            });
    }

    addTicketOnEnter(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            if (this.addingTicketText && this.addingTicketText.trim() !== '') {
                this.addTicket();
                this.addingTicketText = '';
            } else {
                this.cancelAddTicket();
            }
        } else if (event.keyCode === 27) {
            this.cancelAddTicket();
        }
    }

    cancelAddTicket() {
        this.addingTicket = false;
        this.addingTicketText = '';
    }

    
    
    // ============================== LIST RENAME SECTION =============================
    
    editListName() {
        this.editingListName = true;
        this.editingListNameBuffer = this.list.name;
    }


    renameListOnEnter(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            if (this.editingListNameBuffer && this.editingListNameBuffer.trim() !== '') {
                this.updateListName();
                this.editingListNameBuffer = '';
            } else {
                this.cancelListRename();
            }
        } else if (event.keyCode === 27) {
            this.cancelListRename();
        }
    }
    
    // TODO update list from subscribe result
    updateListName() {
        if (this.editingListName) {
            this.list.name = this.editingListNameBuffer;
            this.dataService
                .updateList(this.list)
                .subscribe(result => this.editingListName = false);
        }
    }

    cancelListRename() {
        this.editingListName = false;
        this.editingListNameBuffer = '';
    }


    // Call on onDrop event
    updateTicketsOrder(event) {
        // get list of current elements
        // ticketArr = get tickets from list
        // current order
        // i: number = 0,
        // previous item init
        //     elBefore: number = -1,
        // next item init
        //     elAfter: number = -1,
        // new order init
        //     newOrder: number = 0;

        // search
        // for (i = 0; i < ticketArr.length - 1; i++) {
        //     if (ticketArr[i].getAttribute('ticket-id') == event.ticketId) {
        //         break;
        //     }
        // }

        // if ticket array not empty
        // if (ticketArr.length > 1) {
        //     if current ticket is between elements
        //     if (i > 0 && i < cardArr.length - 1) {
        //         elBefore = +cardArr[i - 1].getAttribute('card-order');
        //         elAfter = +cardArr[i + 1].getAttribute('card-order');
        //
        //         newOrder = elBefore + ((elAfter - elBefore) / 2);
        //     }
        //      else if current ticket in end of list
        //     else if (i == cardArr.length - 1) {
        //         elBefore = +cardArr[i - 1].getAttribute('card-order');
        //         newOrder = elBefore + 1000;
        //      else if current ticket on start of list
        //     } else if (i == 0) {
        //         elAfter = +cardArr[i + 1].getAttribute('card-order');
        //
        //         newOrder = elAfter / 2;
        //     }
        // if list empty - init order
        // } else {
        //     newOrder = 1000;
        // }
        //
        //
        // let ticket = this.tickets.filter(x => x._id === event.cardId)[0];
        // let oldListId = ticket.listId;
        // ticket.order = newOrder;
        // ticket.listId = event.listId;
        // this.dataService.putTicket(ticket).then(res => {
        //     this.dataService.updateTicket(this.list.boardId, ticket);
        // });
    }

    deleteList() {
        this.dataService.deleteList(this.list._id)
            .subscribe( result => {
                if (result[this.list._id] === "ok") {
                    this.removeListFromBoard$.emit(this.list._id);
                }
                else {
                    console.log('something wrong when list deletion');
                }
            })
    }
    
    
    onRemoveTicket(ticketId) {
        this.tickets = this.tickets.filter(ticket => ticket._id !== ticketId);
    }
    
    
    ngOnDestroy() {
        // const bag: any = this.dragulaService.find('dragula-tickets');
        // if (bag !== undefined )
        //     this.dragulaService.destroy('dragula-tickets');

        console.log('List ' + this.list._id + ' destroyed');
    }

}
