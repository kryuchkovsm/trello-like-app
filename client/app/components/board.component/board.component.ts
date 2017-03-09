import { Component, OnInit, Input }         from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { List }                             from '../../classes/list';
import { DragulaService }                   from 'ng2-dragula'
import { DataService }                      from '../../services/data.service';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'board-component',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
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

        dragulaService.setOptions('dragula-lists', {
            moves: function (el, container, handle) {
                return handle.className == 'handle';
            }
        })

        dragulaService.drag.subscribe((value) => {
            console.log('drag subscribe');
            console.log(value);
            this.onDrop(value.slice(1));
        });
    }

    ngOnInit(): void {
        // get boardId from route
        this.subscribtion = this.route.params.subscribe(params => {
            this.boardId = +params['id'] }); // (+) converts string 'id' to a number
        
        // read list from data.service
        this.route.params
            .switchMap((params: Params) => this.dataService.getLists(+params['id']))
            .subscribe(lists => this.lists = lists)
    }

    private onDrop( args ): void {
        console.log('onDrop');
        console.log(args);

        let [e, eModel, target, source] = args;
        let found = false;
        for( let i in this.lists ){
            if( this.lists[i].order == eModel.id ){
                found = true;
                break;
            }
        }

        this.message = "Item '" + eModel.name + "' was ";

        if( found ){
            this.message += 'added.';
        }
        else{
            this.message += 'removed.';
        }
        
        console.log(this.message);
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
        this.subscribtion.unsubscribe();
    }
    
}
