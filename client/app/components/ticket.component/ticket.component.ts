import { 
    Component, 
    Input, 
    Output, 
    OnInit, 
    EventEmitter }    from '@angular/core';

import { DataService }                 from '../../services/data.service'
import { Ticket }                      from '../../classes/ticket';

@Component({
    moduleId: module.id,
    selector: 'ticket-component',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css'],
})

export class TicketComponent implements OnInit{
    @Input() ticket: Ticket;
    @Output() removeTicketFromList$: EventEmitter<string> = new EventEmitter<string>();
    
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

    deleteTicket() {
        this.dataService.deleteTicket(this.ticket._id)
            .subscribe( result => {
                if (result[this.ticket._id] === "ok") {
                    this.removeTicketFromList$.emit(this.ticket._id);
                }
                else {
                    console.log('something wrong when ticket deletion');
                }
            })
    }
}
