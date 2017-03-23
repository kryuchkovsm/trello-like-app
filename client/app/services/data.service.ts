import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp }                      from 'angular2-jwt';
import { AuthService }                   from "./auth.service";
import { Injectable }                    from '@angular/core';
import { Subject }                       from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
    public headers = new Headers({'Content-Type': 'application/json'});

    private apiUrl = 'http://localhost:3000/api';  // URL to web api

    // to use in dashboard and baordlist comonent realtime update
    private sharedBoarList  = new Subject<any>();
    public  sharedBoarList$ = this.sharedBoarList.asObservable();

    constructor(private http:Http,
                private authHttp: AuthHttp) { }

    public getBoard(boardId) {
        const url = `${this.apiUrl}/board?_id=${boardId}`
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }
    
    public addBoard(board) {
        const url = `${this.apiUrl}/board`
        return this.authHttp
            .post( url, JSON.stringify( { board } ), {headers: this.headers})
            .map(res => res.json());
    }
    
    
    public updateBoard(board) {
        const url = `${this.apiUrl}/board`
        return this.authHttp
            .put(url, JSON.stringify( { board } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteBoard(boardId) {
        const url = `${this.apiUrl}/delboard`
        return this.authHttp
            .post( url, JSON.stringify( { boardId } ), {headers: this.headers})
            .map(res => res.json());
    }

    public initSharedBoarList() {
        console.log('initSharedBoarList()');
        const url = `${this.apiUrl}/boardlist`
        this.authHttp
            .get(url)
            .map(res => res.json())
            .subscribe( boards => this.sharedBoarList.next(boards));
    }

    public addList(list) {
        const url = `${this.apiUrl}/list`
        return this.authHttp
            .post(url, JSON.stringify( { list } ), {headers: this.headers})
            .map(res => res.json());
    }

    public updateList(list) {
        const url = `${this.apiUrl}/list`
        return this.authHttp
            .put(url, JSON.stringify( { list } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteList(listId) {
        const url = `${this.apiUrl}/list`;
        let body = JSON.stringify( { listId } )
        let options = new RequestOptions({ 
            headers: this.headers,
            body: body });

        return this.authHttp
            .delete( url, options)
            .map(res => res.json());
    }
    
    public getLists(boardId){
        const url = `${this.apiUrl}/lists?_id=${boardId}`
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }

    public addTicket(ticket) {
        const url = `${this.apiUrl}/addticket`
        return this.authHttp
            .post(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteTicket(ticketId) {
        const url = `${this.apiUrl}/delticket`
        return this.authHttp
            .post( url, JSON.stringify( { ticketId } ), {headers: this.headers})
            .map(res => res.json());
    }

    public getTickets(listId){
        const url = `${this.apiUrl}/tickets?listId=${listId}`
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }

    public getTicket(ticketId){
        const url = `${this.apiUrl}/ticket?ticketId=${ticketId}`
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }

    public updateTicket(ticket) {
        const url = `${this.apiUrl}/updateticket`
        return this.authHttp
            .post(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }

    
    public assignUser(boardId, user) {
        const url = `${this.apiUrl}/assignuser`
        return this.authHttp
            .post(url, JSON.stringify( { "boardId":boardId, "user":user } ), {headers: this.headers})
            .map(res => res.json());
    }

    public removeAssignedUser(boardId, userId) {
        const url = `${this.apiUrl}/removeassigneduser`
        return this.authHttp
            .post(url, JSON.stringify( { "boardId":boardId, "userId":userId } ), {headers: this.headers})
            .map(res => res.json());
    }
        
    public getAassignedUses(boardId) {
        const url = `${this.apiUrl}/assignedusers?_id=${boardId}`
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }
}