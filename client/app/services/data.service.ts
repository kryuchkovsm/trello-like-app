import { List } from '../components/classes/list'
import { Ticket } from '../components/classes/ticket'
import { LISTS } from '../mocks/lists-mock';
import { TICKETS } from '../mocks/tickets-mock';

import { Injectable }      from '@angular/core';
// import { Router }          from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()
export class DataService {

    // constructor(private router: Router, private http:Http) {
    constructor(private http:Http) {
    }

    public getBoards() {
        return this.http.get('http://localhost:3000/api/boards')
            .map(res => res.json());
    }

    public getLists(){
        return this.http.get('http://localhost:3000/api/lists')
                .map(res => res.json());
    }



    public getTickets(listId:string):Ticket[]{
        return TICKETS.filter( ticket => ticket.listId === listId);
    }

    addList(list) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post('http://localhost:3000/api/addlist', JSON.stringify( { list } ), options)
            .map(res => res.json());
    }

    addBoard(board) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post('http://localhost:3000/api/addboard', JSON.stringify( { board } ), options)
            .map(res => res.json());
    }

    // addItem(item) {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http
    //         .post('http://localhost:3000/api/addItem', JSON.stringify( { item } ), options)
    //         .map(res => res.json());
    // }

    // deleteItem() {
    //     return this.http
    //         .delete('http://localhost:3000/api/itemId');
    // }
}