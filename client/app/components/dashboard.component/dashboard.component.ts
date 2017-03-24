import { Component, OnDestroy, OnInit } from '@angular/core';
import { Board }     from '../../classes/board'
import { DataService }      from '../../services/data.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})

export class DashBoardComponent implements OnDestroy, OnInit {
    boards: any[];
    addBoardName: string;
    addingBoard: boolean = false;
    boardlistSubscription: any;
    
    constructor( private dataService: DataService) {
        this.dataService.updateSharedBoarList();
        // subscribe to boards list to realtime update
        this.boardlistSubscription = this.dataService
            .sharedBoarList$
            .subscribe( boards => this.boards = boards );
    };

    ngOnInit() {
        
    }
    
    public enableAddBoard(){
        this.addingBoard = true;
    }

    addBoard() {
        this.boards = this.boards || [];
        let newBoard = <Board>{
            name: this.addBoardName,
            order: (this.boards.length + 1) * 1000,
        };
        this.dataService.addBoard(newBoard)
            .subscribe(board => {
                this.boards.push(board);
            });
    }

    addBoardOnEnter(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            if (this.addBoardName && this.addBoardName.trim() !== '') {
                this.addBoard();
                this.addBoardName = '';
            } else {
                this.cancelAddBoard();
            }
        } else if (event.keyCode === 27) {
            this.cancelAddBoard();
        }
    }

    cancelAddBoard() {
        this.addingBoard = false;
        this.addBoardName = '';
    }
    
    
    ngOnDestroy() {
        this.boardlistSubscription.unsubscribe();
    }
}
