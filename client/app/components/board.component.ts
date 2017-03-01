import { Component, OnInit } from '@angular/core';
import { DataService }      from '../services/data.service';
import { List } from './classes/list';

import { User } from './classes/user';

@Component({
    selector: 'board-component',
    templateUrl: './app/components/html/board.component.html',
    styleUrls: ['./app/components/css/board.component.css'],    
})

export class BoardComponent implements OnInit {    
    lists: List[];
    
    user: User;
    
    addingList: boolean = false;
    addListName: string = '';

    constructor( private dataService: DataService) { }

    ngOnInit(): void {        
        this.getLists();
        this.getUser();
    }

    public getUser() {
        this.dataService.getUser()
            .subscribe(user => { this.user = user });
    }
    
    public getLists() {
        this.dataService.getLists()
            .subscribe(lists => { this.lists = lists });
    }

    public enableAddList(){
        this.addingList = true;
    }

    addList() {
        this.lists = this.lists || [];
        let newList = <List>{
            _id: +new Date(),
            name: this.addListName,
            order: (this.lists.length + 1),
            // columnId: this.column._id,
            // boardId: this.column.boardId
        };
        this.dataService.addList(newList)
            .subscribe(list => {
                this.lists.push(list);
                // this.onAddCard.emit(card);
                // this._ws.addCard(card.boardId, card);
            });
    }

    addListOnEnter(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            if (this.addListName && this.addListName.trim() !== '') {
                this.addList();
                this.addListName = '';
            } else {
                this.cancelAddList();
            }
        } else if (event.keyCode === 27) {
            this.cancelAddList();
        }
    }

    cancelAddList() {
        this.addingList = false;
        this.addListName = '';
    }

}
