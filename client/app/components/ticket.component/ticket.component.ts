import { Component, Input, OnInit }    from '@angular/core';
import { DataService }                 from '../../services/data.service'
import { Ticket }                      from '../../classes/ticket';

@Component({
    moduleId: module.id,
    selector: 'ticket-component',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css'],
})

export class TicketComponent implements OnInit{

    private _index: number;


    @Input() ticket: Ticket;
    
    constructor (
        private dataService: DataService) { }

    ngOnInit() { }





    editingTicket: boolean = false;

    enableEditTicket() {
        this.editingTicket = true;
    }

    updateTicket() {
        this.cancelEditTicket();
        this.dataService.updateTicket(this.ticket)
            .subscribe(ticket => this.ticket.text = ticket.text);
    }

    cancelEditTicket() {
        this.editingTicket = false;
    }
}
