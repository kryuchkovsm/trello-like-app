import { Ticket } from '../components/classes/ticket'
import { TICKETS } from '../mocks/tickets-mock';

import { Injectable }      from '@angular/core';
import {Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'


@Injectable()
export class DataService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = 'http://localhost:3000/api';  // URL to web api


    constructor(private http:Http) { }

    public getBoards() {
        const url = `${this.apiUrl}/boards`
        return this.http.get(url)
            .map(res => res.json());
    }

    public getLists(){
        const url = `${this.apiUrl}/lists`
        return this.http.get(url)
                .map(res => res.json());
    }

    public getUser() {
        const url = `${this.apiUrl}/user`
        return this.http.get(url)
            .map(res => res.json());
    }
    
    public getTickets(listId:string):Ticket[]{
        return TICKETS.filter( ticket => ticket.listId === listId);
    }

    public addList(list) {
        return this.http
            .post('http://localhost:3000/api/addlist', JSON.stringify( { list } ), {headers: this.headers})
            .map(res => res.json());
    }

    public addBoard(board) {
        return this.http
            .post('http://localhost:3000/api/addboard', JSON.stringify( { board } ), {headers: this.headers})
            .map(res => res.json());
    }

    public logout() {
        window.location.href = '/logout';
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http
        //     .post('http://localhost:3000/logout', {'action':'logout'}, options)
        //     .map(res => res.json());
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


    public getUserEmail() {
        const url = `${this.apiUrl}/useremail`;
        return this.http.get(url)
            .map(res => res.json());
    }

    // public getUserEmail():Promise<string> {
    //     return this.http.get('http://localhost:3000/api/useremail')
    //         .toPromise()
    //         .then(response => response.json().useremail as string)
    //         .catch(this.handleError);
    // }

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