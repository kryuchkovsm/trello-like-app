import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from "./auth.service";
import { Injectable }      from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Board } from '../classes/board'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

// TODO refactor or split DataService
@Injectable()
export class DataService {
    public headers = new Headers({'Content-Type': 'application/json'});

    private apiUrl = 'http://localhost:3000/api';  // URL to web api

    // to use in dashboard and baordlist comonent realtime update
    private sharedBoarList  = new Subject<any>();
    public  sharedBoarList$ = this.sharedBoarList.asObservable();
    
    boards: Board[];
    
    constructor(private http:Http,
                // private authHttp: AuthHttp,
                private authService: AuthService) { }

    public getBoard(boardId) {
        const url = `${this.apiUrl}/board?_id=${boardId}`
        return this.http.get(url)
            .map(res => res.json());
    }
    
    public addBoard(board) {
        const url = `${this.apiUrl}/board`
        return this.http
            .post( url, JSON.stringify( { board } ), {headers: this.headers})
            .map(res => res.json());
    }
    
    
    public updateBoard(board) {
        const url = `${this.apiUrl}/board`
        return this.http
            .put(url, JSON.stringify( { board } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteBoard(boardId) {
        const url = `${this.apiUrl}/delboard`
        return this.http
            .post( url, JSON.stringify( { boardId } ), {headers: this.headers})
            .map(res => res.json());
    }

    public initSharedBoarList() {
        console.log('initSharedBoarList()');
        const url = `${this.apiUrl}/boardlist`
        this.http.get(url)
            .map(res => res.json())
            .subscribe( boards => this.sharedBoarList.next(boards));
    }

    public addList(list) {
        const url = `${this.apiUrl}/list`
        return this.http
            .post(url, JSON.stringify( { list } ), {headers: this.headers})
            .map(res => res.json());
    }

    public updateList(list) {
        const url = `${this.apiUrl}/list`
        return this.http
            .put(url, JSON.stringify( { list } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteList(listId) {
        const url = `${this.apiUrl}/list`;
        let body = JSON.stringify( { listId } )
        let options = new RequestOptions({ 
            headers: this.headers,
            body: body });

        return this.http
            .delete( url, options)
            .map(res => res.json());
    }
    
    public getLists(boardId){
        const url = `${this.apiUrl}/lists?_id=${boardId}`
        return this.http.get(url)
                .map(res => res.json());
    }

    public addTicket(ticket) {
        const url = `${this.apiUrl}/addticket`
        return this.http
            .post(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteTicket(ticketId) {
        const url = `${this.apiUrl}/delticket`
        return this.http
            .post( url, JSON.stringify( { ticketId } ), {headers: this.headers})
            .map(res => res.json());
    }

    public getTickets(listId){
        const url = `${this.apiUrl}/tickets?listId=${listId}`
        return this.http.get(url)
            .map(res => res.json());
    }

    public getTicket(ticketId){
        const url = `${this.apiUrl}/ticket?ticketId=${ticketId}`
        return this.http.get(url)
            .map(res => res.json());
    }

    public updateTicket(ticket) {
        const url = `${this.apiUrl}/updateticket`
        return this.http
            .post(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }

    
    public assignUser(boardId, user) {
        const url = `${this.apiUrl}/assignuser`
        return this.http
            .post(url, JSON.stringify( { "boardId":boardId, "user":user } ), {headers: this.headers})
            .map(res => res.json());
    }

    public removeAssignedUser(boardId, userId) {
        const url = `${this.apiUrl}/removeassigneduser`
        return this.http
            .post(url, JSON.stringify( { "boardId":boardId, "userId":userId } ), {headers: this.headers})
            .map(res => res.json());
    }
        
    public getAassignedUses(boardId) {
        const url = `${this.apiUrl}/assignedusers?_id=${boardId}`
        return this.http.get(url)
            .map(res => res.json());
    }
    // public logout() {
    //     window.location.href = '/logout';
    //     // let headers = new Headers({ 'Content-Type': 'application/json' });
    //     // let options = new RequestOptions({ headers: headers });
    //     // return this.http
    //     //     .post('http://localhost:3000/logout', {'action':'logout'}, options)
    //     //     .map(res => res.json());
    // }


    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }


    // public getUserEmail() {
    //     const url = `${this.apiUrl}/useremail`;
    //     return this.http.get(url)
    //         .map(res => res.json());
    // }

    // public getUser() {
    //     const url = `${this.apiUrl}/user`
    //     return this.http.get(url)
    //         .map(res => res.json());
    // }
    
    
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