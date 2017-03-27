import { Component, Output, EventEmitter } from '@angular/core';
import { Board }     from '../../classes/board'
import { DataService }      from '../../services/data.service';

@Component({
    moduleId: module.id,
    selector: 'boardlist-component',
    templateUrl: './boardlist.component.html',
    styleUrls:  ['./boardlist.component.css'],
    
})

export class BoardListComponent {
    @Output() closeBoardList$: EventEmitter<boolean> = new EventEmitter<boolean>();
    myBoards: Board[];
    assignedBoards: Board[];
    addBoardName: string;
    addingBoard: boolean = false;
    
    // subscribe to boards list to realtime update
    constructor( private dataService: DataService) {
        this.dataService
            .sharedBoarList$
            .subscribe( boards => {
                this.myBoards = boards.filter(board => board.rights.includes('Owner'));
                this.assignedBoards = boards.filter(board => (!board.rights.includes('Owner') ));
            });
    }

    closeBoardList() {
        this.closeBoardList$.emit(true)
    }
    
    public enableAddBoard(){
        this.addingBoard = true;
    }

    addBoard() {
        this.myBoards = this.myBoards || [];
        let newBoard = <Board>{
            name: this.addBoardName,
            order: (this.myBoards.length + 1) * 1000,
        };
        this.dataService.addBoard(newBoard)
            .subscribe(board => {
                this.myBoards.push(board);
            });
        this.dataService.updateSharedBoarList();
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

    hasAssignedBoards() {
        if (this.assignedBoards)
            return this.assignedBoards.length > 0;
    }


    cancelAddBoard() {
        this.addingBoard = false;
        this.addBoardName = '';
    }

}
