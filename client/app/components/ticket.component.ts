import { Component, Input } from '@angular/core';
import { Ticket } from './classes/ticket';


@Component({
    selector: 'ticket-component',
    templateUrl: './app/components/html/ticket.component.html',
    styleUrls: ['./app/components/css/ticket.component.css'],
    // providers: [TreeNodeService]
})

export class TicketComponent {
    @Input() inputTicket: Ticket;

    
}
