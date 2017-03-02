import { Component, Input } from '@angular/core';
import { Ticket } from '../../classes/ticket';


@Component({
    selector: 'ticket-component',
    templateUrl: './app/components/ticket.component/ticket.component.html',
    styleUrls: ['./app/components/ticket.component/ticket.component.css'],
})

export class TicketComponent {
    @Input() inputTicket: Ticket;

    
}
