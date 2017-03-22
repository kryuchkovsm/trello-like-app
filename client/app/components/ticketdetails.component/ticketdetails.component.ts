import { 
    Component, 
    Input,
    OnInit,
    OnDestroy}         from '@angular/core';

import { DataService }     from '../../services/data.service'
import { SharedService }   from '../../services/shared.service'
import { Ticket }          from '../../classes/ticket';

@Component({
    moduleId: module.id,
    selector: 'ticketdetails-component',
    templateUrl: './ticketdetails.component.html',
    styleUrls: ['./ticketdetails.component.css'],
})

export class TicketDetailsComponent implements OnInit, OnDestroy {
    @Input() ticketId: string;
    ticket:Ticket;

    descriptionEditBuffer: string = '';
    descriptionEditing:boolean = false;
    
    constructor (
        private dataService: DataService,
        private sharedService: SharedService) {
        
    }

    ngOnInit() {
        console.log(this.ticketId);
        this.getTicket();
    }

    getTicket() {
        this.dataService.getTicket(this.ticketId)
            .subscribe(ticket => {
                this.ticket = ticket;
            });
    }

    saveDescription() {
        this.ticket.description = this.descriptionEditBuffer;
        this.updateTicket();
        this.cancelEditDescription();
    }

    updateTicket() {
        this.dataService.updateTicket(this.ticket)
            .subscribe(ticket => {
                this.ticket = ticket;
            });
    
    }
    
    updateTicketTitle() {

    }


    // set GUI flag to change div to textarea, and save original description to buffer(to have cancel ability)
    editDescription(condition) {
        this.descriptionEditing = condition;
        if (condition) {
            this.descriptionEditBuffer = this.ticket.description;
        }
    }

    // remove textarea and button, place div back, clean buffer 
    cancelEditDescription() {
        this.descriptionEditing = false;
        this.descriptionEditBuffer = '';
    }

    // emit close to caler component, to remove component with *ngIf
    close() {
        console.log('close');
        let ticket = {};
        ticket['visibility'] = false;
        ticket['_id'] = this.ticket._id;
        ticket['text'] = this.ticket.text;
        this.sharedService.setTicketDetails(ticket);
    }

    // just debug for this time
    ngOnDestroy() {
        // console.log('destroy ticket details component');
    }
}
