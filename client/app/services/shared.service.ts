import { Injectable }      from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map'

@Injectable()
export class SharedService {
    // Observable string sources
    private showTicketDetails = new Subject<any>();
    // Observable string streams
    showTicketDetails$ = this.showTicketDetails.asObservable();

    // Service message commands
    setTicketDetails(ticket: Object) {
        this.showTicketDetails.next(ticket);
    }

    // private updateTicketDetails = new Subject<any>();
    //
    // updateTicketDetails$ = this.updateTicketDetails.asObservable();
    //
    // updateTicketDetails(ticket: Object) {
    //     this.updateTicketDetails.next(ticket);
    // }
    

    // publishData(data: string) {
    //     console.log('Inside publish data: ' + data);
    //     this.caseNumber = data;
    // }

    // subscribeData() {
    //     console.log('Inside subscribeData: ' + this.caseNumber);
    //     return this.caseNumber;
    // }
}