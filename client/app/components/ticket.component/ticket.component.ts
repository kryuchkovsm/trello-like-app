import { 
    Component, 
    Input, 
    Output, 
    OnInit, 
    OnDestroy,
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

export class TicketComponent implements OnInit, OnDestroy{
    @Input() ticket: Ticket;
    @Output() removeTicketFromList$: EventEmitter<string> = new EventEmitter<string>();
    
    ticketDetailsSubscribtion: any;
    
    hasRights:boolean = false;
    
    constructor (
        private dataService: DataService,
        private sharedService: SharedService) {

        this.ticketDetailsSubscribtion = 
            this.sharedService
                .showTicketDetails$
                .subscribe(ticket => {
                if (this.ticket._id === ticket._id && (!ticket.visibility)) {
                    this.ticket.text = ticket.text;
                }
            });
    }

    ngOnInit() {
        this.hasRights = this.dataService.getRights();

    }

    deleteTicket() {
        this.dataService.deleteTicket(this.ticket)
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
        ticket['boardId'] = this.ticket.boardId;
        this.sharedService.setTicketDetails(ticket);
    }
    
    ngOnDestroy() {
        this.ticketDetailsSubscribtion.unsubscribe();
    }
    
}
