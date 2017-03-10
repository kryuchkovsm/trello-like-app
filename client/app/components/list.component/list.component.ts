import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataService }              from '../../services/data.service'
import { DragulaService }           from 'ng2-dragula'
import { Ticket }                   from '../../classes/ticket'
import { List }                     from '../../classes/list'
import {OrderBy}                    from '../../pipes/orderby.pipe';

@Component({
    moduleId: module.id,
    selector: 'list-component',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit, OnDestroy{
    @Input() inputList: List;


    // dragula debug message
    message : string;

    // UI transform from span to input
    addingTicket: boolean;

    addingTicketText: string;
    tickets: Ticket[];



    constructor (
        private dataService: DataService,
        private dragulaService: DragulaService) {
            
        // dragulaService.dropModel.subscribe((value) => {
        //     console.log('============= dragulasevice dropmodel list =============');
        //     console.log(value);
        //     // this.onDrop(value.slice(1));
        // });

        dragulaService.drop.subscribe((value) => {
            console.log(`drop: ${value[0]}`);
            this.onDrop(value.slice(1));
        });
    }

    private onDrop(args) {
        let [e, el] = args;
        console.log('e');
        console.log(e);
        console.log('el');
        console.log(el);
        console.log(this.tickets);
        // do something
    }



    ngOnInit(): void {
        this.dataService.getTickets(+this.inputList._id)
            .subscribe(tickets => {
                this.tickets = tickets;
            })
    }
    
    public enableAddTicket(){
        this.addingTicket = true;
    }

    addTicket() {
        this.tickets = this.tickets || [];
        let newTicket = <Ticket>{
            _id: +new Date(),
            listId: this.inputList._id,
            boardId: this.inputList.boardId,
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
        console.log('cancel addticket');
        this.addingTicket = false;
        this.addingTicketText = '';
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


    ngOnDestroy() {
        console.log('List ' + this.inputList._id + ' destroyed');
    }

}
