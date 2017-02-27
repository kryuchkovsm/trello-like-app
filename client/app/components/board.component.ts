import { Component, OnInit, Input } from '@angular/core';
import { DataService }      from '../services/data.service';
import { List } from './classes/list';

@Component({
    selector: 'board-component',
    templateUrl: './app/components/html/board.component.html',
    styleUrls: ['./app/components/css/board.component.css'],    
})

export class BoardComponent implements OnInit {    
    lists: List[];

    constructor( private dataService: DataService) { }

    ngOnInit(): void {        
        this.getLists();        
    }

    public getLists() {
        this.lists = this.dataService.getLists();
    }
}
