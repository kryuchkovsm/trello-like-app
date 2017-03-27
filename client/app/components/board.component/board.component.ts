import { Component, OnInit, Input, OnDestroy }         from '@angular/core';
import { DataService }                      from '../../services/data.service';
import { SharedService }                    from '../../services/shared.service';
import { DragulaService }                   from 'ng2-dragula'
import { List }                             from '../../classes/list';
import { Board }                             from '../../classes/board';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    viewProviders: [DragulaService],
})

export class BoardComponent implements OnInit, OnDestroy {
    // this board id
    boardId: string;
    board: Board;
    lists: List[];
    
    message: string;
    // UI transform from span to textarea or input
    addingList: boolean = false;
    // same for board name
    editingBoardName: boolean = false;
    editingBoardNameBuffer: string;
    // new list name
    addListName: string = '';
    setupVisible: boolean = false;
    
    // better to move ouside board component?
    ticketDetailsVisible: boolean;
    ticketDetailsTicketId: string;



    // to ger this.boardId from route
    private subscribtion: any;

    constructor(
        private dataService:    DataService,
        private dragulaService: DragulaService,
        private sharedService:  SharedService,
        private router:         Router,
        private route:          ActivatedRoute) {

        console.log('construct board');

        this.sharedService.showTicketDetails$.subscribe(
            ticket => {
                this.ticketDetailsVisible = ticket.visibility;
                this.ticketDetailsTicketId = ticket._id;
            });

        this.dragulaService
            .setOptions('dragula-lists', {
                moves: function (el, container, handle) {
                    // console.log('dragula set options xxxxx');
                    return handle.className === 'handle'
                        
            },
                direction: 'horizontal'
        });

        // this.dragulaService
        //     .setOptions('dragula-tickets', { });
        
        dragulaService.drop
            .subscribe(value => {
                console.log('------------- dragulasevice drop in board.component.ts ---------------');
                // console.log(value);
                // this.onDrop(value);
            })
        
        dragulaService.dropModel
            .subscribe(value => {
                console.log('============= dragulasevice dropmodel in board.component.ts =============');
                // console.log(value);
                // console.log(this.lists)
            })
    }

    ngOnInit(): void {
        console.log('init board');

        // get boardId from route         
        this.subscribtion = this.route.params
            .subscribe(params => {
                this.boardId = params['id']
            });

        if (this.boardId) {
            this.dataService.getBoard(this.boardId)
                .subscribe(board => this.board = board,
                           err   => this.router.navigate(['/dashboard']))
                    
        }

        // read list from data.service
        this.route.params
            .switchMap((params: Params) => this.dataService.getLists(params['id']))
            .subscribe(lists => this.lists = lists)
    }

    private onDrop( args ): void {
        console.log(args);
        let [type, eModel, target, source] = args;
        switch(type) {
            case 'dragula-lists': {
                // console.log('list dragged');
                break;
            }
            case 'dragula-tickets': {
                // console.log('ticket dragged');



                // TODO get parentID, and set to dragged item
                let parent = target;


                // TODO get orders of siblings
                break;
            }
            default: {
                console.log('unknown dragged object');
                break;
            }
        }
        // let found = false;
        // for( let i in this.lists ){
        //     if( this.lists[i].order == eModel.id ){
        //         found = true;
        //         break;
        //     }
        // }
        //
        // this.message = "Item '" + eModel.name + "' was ";
        //
        // if( found ){
        //     this.message += 'added.';
        // }
        // else{
        //     this.message += 'removed.';
        // }

        // console.log(this.message);
    }


    
    toggleSetup() {
        this.setupVisible = !this.setupVisible;
    }
    
    public enableAddList(){
        this.addingList = true;
    }

    addList() {
        this.lists = this.lists || [];
        let newList = <List>{
            name: this.addListName,
            order: (this.lists.length + 1) * 1000,
            boardId: this.board.boardId
        };
        this.dataService.addList(newList)
            .subscribe(list => {
                this.lists.push(list);
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
    
    
    // remove list from gui, after deletion on server
    onRemoveList(listId) {
        this.lists = this.lists.filter(list => list._id !== listId);
    }

    
    onCloseBoardSettings() {
        this.setupVisible = false;
    }
    
    
    
   

    editBoardName() {
        this.editingBoardName = true;
        this.editingBoardNameBuffer = this.board.name;
    }

    cancelEditingBoardName() {
        this.editingBoardName = false;
        this.editingBoardNameBuffer = '';
    }

    renameBoardOnEnter(event: KeyboardEvent) {
        if (event.keyCode === 13) {
                this.renameBoard();
        } else if (event.keyCode === 27) {
            this.cancelEditingBoardName();
        }
    }
    
    renameBoard() {
        if (this.editingBoardNameBuffer && this.editingBoardNameBuffer.trim() !== '') {
            this.board.name = this.editingBoardNameBuffer;
            this.dataService.updateBoard(this.board)
                .subscribe(board => {
                    this.board = board;
                    //update board names for dashboard and boardlist
                    this.dataService.updateSharedBoarList();
                });
        }
        this.cancelEditingBoardName();
    }
    
    ngOnDestroy() {
        console.log('destroy board');
        this.subscribtion.unsubscribe();
        this.dragulaService.destroy('dragula-lists');
    }
}
