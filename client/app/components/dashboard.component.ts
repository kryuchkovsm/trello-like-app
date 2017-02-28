import { Component, OnInit } from '@angular/core';
import { Board }     from './classes/board'
import { DataService }      from '../services/data.service';

@Component({
    selector: 'dashboard-component',
    templateUrl: './app/components/html/dashboard.component.html',
    styleUrls: ['./app/components/css/dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
    boards: Board[];
    addBoardName: string;
    addingBoard: boolean = false;
    
    constructor( private dataService: DataService) { }

    ngOnInit(): void {
        this.getBoards();
    }

    public getBoards() {
        this.dataService.getBoards()
            .subscribe(boards => { this.boards = boards });
    }


    public enableAddBoard(){
        this.addingBoard = true;
    }

    addBoard() {
        this.boards = this.boards || [];
        let newBoard = <Board>{
            _id: +new Date(),
            name: this.addBoardName,
            order: (this.boards.length + 1),
        };
        this.dataService.addBoard(newBoard)
            .subscribe(board => {
                this.boards.push(board);
                // this.onAddCard.emit(card);
                // this._ws.addCard(card.boardId, card);
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

}
