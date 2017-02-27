import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { Ticket } from './classes/ticket'
import { List } from './classes/list'

@Component({
    selector: 'list-component',
    templateUrl: './app/components/html/list.component.html',
    styleUrls: ['./app/components/css/list.component.css'],
})

export class ListComponent implements OnInit{
    @Input() inputList: List;

    tickets: Ticket[];

    // constructor (private dataService: DataService) {
    constructor (private dataService: DataService) {
    }

    ngOnInit(): void {
        this.getTickets(this.inputList._id);
    }

    public getTickets(listId) {
        this.tickets = this.dataService.getTickets(listId);
    }

}
