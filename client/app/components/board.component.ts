import { Component, OnInit } from '@angular/core';
import { DataService }      from '../services/data.service';
import { List } from './classes/list';

@Component({
    selector: 'board-component',
    templateUrl: './app/components/html/board.component.html',
    styleUrls: ['./app/components/css/board.component.css'],
    
})

export class BoardComponent implements OnInit {

    lists: List[];

    constructor( private dataService: DataService) {
        this.lists = this.dataService.getLists();
        console.log(this.lists);
    }

    ngOnInit(): void {
        this.getLists();
    }

    public getLists() {
        this.dataService.getLists();
    }


    // simpleDrop: any = null;
    // listBoxers:Array<string> = ['Sugar Ray Robinson','Muhammad Ali','George Foreman','Joe Frazier','Jake LaMotta','Joe Louis','Jack Dempsey','Rocky Marciano','Mike Tyson','Oscar De La Hoya'];
    // listTeamOne:Array<string> = [];
    // listTeamTwo:Array<string> = [];
}
