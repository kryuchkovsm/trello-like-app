import { Component, OnInit } from '@angular/core';
import { Board }     from '../../classes/board'
import { DataService }      from '../../services/data.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})

export class DashBoardComponent implements OnInit {

    boards: Board[];
    addBoardName: string;
    addingBoard: boolean = false;

    homeList: Array<Object> = [
        {id: 1, name: 'apples'},
        {id: 2, name: 'oranges'},
        {id: 3, name: 'bananas'},
        {id: 4, name: 'watermelon'},
        {id: 5, name: 'pineapple'},
        {id: 6, name: 'peaches'},
        {id: 7, name: 'pears'},
        {id: 8, name: 'kiwis'}
    ];

    firstList: Array<Object> = [];
    secondList: Array<Object> = [];

    constructor( private dataService: DataService) {};
    

    ngOnInit(): void {
        this.getBoards();
    }

    
    public getBoards() {
        this.dataService.getBoards()
            .subscribe(boards => {
                this.boards = boards });
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
