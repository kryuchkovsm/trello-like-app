import { Component, OnInit, Input }         from '@angular/core';
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

export class BoardComponent implements OnInit {
    // this board id
    boardId: number;
    lists: List[];
    
    message: string;
    // UI transform from span to textarea or input
    addingList: boolean = false;
    // new list name
    addListName: string = '';

    // to ger this.boardId from route
    private subscribtion: any;

    constructor(
        private dataService: DataService,
        private dragulaService: DragulaService,
        private route: ActivatedRoute) {

        console.log('construct board');
        dragulaService
            .setOptions('dragula-lists', {
                moves: function (el, container, handle) {
                    console.log('dragula set options');
                    return handle.className === 'handle'
                }

            })

        // dragulaService.dropModel
        //     .subscribe(value => {
        //         console.log('============= dragulasevice dropmodel board =============');
        //         console.log(value);
        //     })
    }

    ngOnInit(): void {
        console.log('init board');
        // get boardId from route
        this.subscribtion = this.route.params.subscribe(params => {
            this.boardId = +params['id'] }); // (+) converts string 'id' to a number
        
        // read list from data.service
        this.route.params
            .switchMap((params: Params) => this.dataService.getLists(+params['id']))
            .subscribe(lists => this.lists = lists)
    }

    // private onDrop( args ): void {
    //     // console.log('onDrop');
    //     // console.log(args);
    //
    //     let [e, eModel, target, source] = args;
    //     let found = false;
    //     for( let i in this.lists ){
    //         if( this.lists[i].order == eModel.id ){
    //             found = true;
    //             break;
    //         }
    //     }
    //
    //     this.message = "Item '" + eModel.name + "' was ";
    //
    //     if( found ){
    //         this.message += 'added.';
    //     }
    //     else{
    //         this.message += 'removed.';
    //     }
    //    
    //     // console.log(this.message);
    // }
    //

    public enableAddList(){
        this.addingList = true;
    }

    addList() {
        this.lists = this.lists || [];
        let newList = <List>{
            _id: +new Date(),
            name: this.addListName,
            order: (this.lists.length + 1),
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

    cancelAddList() {
        this.addingList = false;
        this.addListName = '';
    }

    ngOnDestroy() {
        console.log('destroy board');
        this.subscribtion.unsubscribe();
        this.dragulaService.destroy('dragula-lists');
    }
    
}
