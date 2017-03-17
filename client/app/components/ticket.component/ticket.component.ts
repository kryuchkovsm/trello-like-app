import { 
    Component, 
    Input, 
    Output, 
    OnInit, 
    EventEmitter }    from '@angular/core';

import { DataService }                 from '../../services/data.service'
import { SharedService }               from '../../services/shared.service'
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
        private dataService: DataService,
        private sharedService: SharedService) {

        this.sharedService.showTicketDetails$.subscribe(
            ticket => {
                if (this.ticket._id === ticket._id && (!ticket.visibility)) {
                    this.ticket.text = ticket.text;
                }
            });
    }

    ngOnInit() { }

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

    showTicketDetails() {
        let ticket = {};
        ticket['visibility'] = true;
        ticket['_id'] = this.ticket._id;
        this.sharedService.setTicketDetails(ticket);
    }
    
}
