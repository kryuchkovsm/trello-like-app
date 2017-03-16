import { Component, OnInit, Input, OnDestroy }         from '@angular/core';
import { DataService }                      from '../../services/data.service';
import { DragulaService }                   from 'ng2-dragula'
import { List }                             from '../../classes/list';
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
    lists: List[];
    message: string;
    // UI transform from span to textarea or input
    addingList: boolean = false;
    // new list name
    addListName: string = '';

    setupVisible: boolean = false;
    
    // to ger this.boardId from route
    private subscribtion: any;

    constructor(
        private dataService: DataService,
        private dragulaService: DragulaService,
        private route: ActivatedRoute) {

        console.log('construct board');

        this.dragulaService
            .setOptions('dragula-lists', {
                moves: function (el, container, handle) {
                    // console.log('dragula set options xxxxx');
                    return handle.className === 'handle'
                        
            },
                direction: 'horizontal'
                
        });

        // const bag: any = this.dragulaService.find('dragula-tickets');
        // console.log('"dragula-tickets" bag from boards.component')
        // console.log(bag);
        //
        // const bag1: any = this.dragulaService.find('dragula-lists');
        // console.log('"dragula-lists" bag from boards.component')
        // console.log(bag1);

        // dragulaService.drop
        //     .subscribe(value => {
        //         console.log('------------- dragulasevice drop in board.component.ts ---------------');
        //         // console.log(value);
        //         this.onDrop(value);
        //     })
        
        // dragulaService.dropModel
        //     .subscribe(value => {
                // console.log('============= dragulasevice dropmodel in board.component.ts =============');
                // console.log(value);
                // console.log(this.lists)
            // })
    }

    ngOnInit(): void {
        console.log('init board');

        // get boardId from route
        this.subscribtion = this.route.params.subscribe(params => {
            this.boardId = params['id'] });

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
            // _id: +new Date(),
            name: this.addListName,
            order: (this.lists.length + 1) * 1000,
            boardId: this.boardId
        };
        this.dataService.addList(newList)
            .subscribe(list => {
                this.lists.push(list);
                // this.onAddList.emit(list);
                // this._ws.addList(list.boardId, list);
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

    
    onRemoveList(listId) {
        this.lists = this.lists.filter(list => list._id !== listId);
    }

    cancelAddList() {
        this.addingList = false;
        this.addListName = '';
    }

    onCloseBoardSettings() {
        this.setupVisible = false;
    }


    ngOnDestroy() {
        console.log('destroy board');
        this.subscribtion.unsubscribe();
        this.dragulaService.destroy('dragula-lists');
    }
    
}
