import { Component, OnInit, Input } from '@angular/core';
import { DataService }      from '../../services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { List } from '../../classes/list';
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

    // UI transform from span to textarea or input
    addingList: boolean = false;
    // new list name
    addListName: string = '';

    // to ger this.boardId from route
    private subscribtion: any;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        // get boardId from route
        this.subscribtion = this.route.params.subscribe(params => {
            this.boardId = +params['id'] }); // (+) converts string 'id' to a number
        
        // read list from data.service
        this.route.params
            .switchMap((params: Params) => this.dataService.getLists(+params['id']))
            .subscribe(lists => this.lists = lists)
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
