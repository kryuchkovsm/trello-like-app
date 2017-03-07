import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
import { Ticket } from '../../classes/ticket'
import { List } from '../../classes/list'

@Component({
    selector: 'list-component',
    templateUrl: './app/components/list.component/list.component.html',
    styleUrls: ['./app/components/list.component/list.component.css'],
})

export class ListComponent implements OnInit{
    @Input() inputList: List;

    // UI transform from span to input
    addingTicket: boolean;

    addingTicketText: string;
    tickets: Ticket[];



    // constructor (private dataService: DataService) {
    constructor ( private dataService: DataService ) {
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
            order: (this.tickets.length + 1),
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

}
