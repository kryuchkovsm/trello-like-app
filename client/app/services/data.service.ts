// TODO split service to components correspoiding?
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp }                      from 'angular2-jwt';
import { Injectable }                    from '@angular/core';
import { Subject }                       from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
    public headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = 'http://localhost:3000/api';  // URL to web api

    // to use in dashboard and baordlist comonent realtime update
    public sharedBoarList  = new Subject<any>();
    public  sharedBoarList$ = this.sharedBoarList.asObservable();

    boards: any[];
    
    constructor(private http:Http,
                private authHttp: AuthHttp) { }


    // ====================================================================
    // =========================   BOARD   ================================
    // ====================================================================

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
        const url = `${this.apiUrl}/board`;
        let body = JSON.stringify({boardId})
        let options = new RequestOptions({
            headers: this.headers,
            body: body
        });
        return this.authHttp
            .delete( url, options)
            .map(res => res.json());
    }
    
    public updateSharedBoarList() {
        const url = `${this.apiUrl}/board?_id=all`
        this.authHttp
            .get(url)
            .map(res => res.json())
            .subscribe( boards => this.sharedBoarList.next(boards));
    }
    
    // ====================================================================
    // =========================   LIST    ================================
    // ====================================================================

    public getLists(boardId){
        const url = `${this.apiUrl}/list?_id=${boardId}`
        return this.authHttp
            .get(url)
            .map(res => res.json());
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

    // ====================================================================
    // =========================   TICKET   ================================
    // ====================================================================

    public getTickets(listId){
        const url = `${this.apiUrl}/ticket?listId=${listId}`
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
    
    public addTicket(ticket) {
        const url = `${this.apiUrl}/ticket`
        return this.authHttp
            .post(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }
    
    public updateTicket(ticket) {
        const url = `${this.apiUrl}/ticket`
        return this.authHttp
            .put(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteTicket(ticketId) {
        const url = `${this.apiUrl}/ticket`
        let body = JSON.stringify( { ticketId } )
        let options = new RequestOptions({
            headers: this.headers,
            body: body });
        return this.authHttp
            .delete( url, options)
            .map(res => res.json());
    }

    // ====================================================================
    // =========================   BOARD USERS=============================
    // ====================================================================
    
    public getAassignedUses(boardId) {
        const url = `${this.apiUrl}/assigneduser?_id=${boardId}`
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }
    
    public assignUser(boardId, user) {
        const url = `${this.apiUrl}/assigneduser`
        return this.authHttp
            .post(url, JSON.stringify( { "boardId":boardId, "user":user } ), {headers: this.headers})
            .map(res => res.json());
    }

    public removeAssignedUser(boardId, userId) {
        const url = `${this.apiUrl}/assigneduser`
        let body = JSON.stringify( { "boardId":boardId, "userId":userId } )
        let options = new RequestOptions({
            headers: this.headers,
            body: body });
        return this.authHttp
            .delete( url, options)
            .map(res => res.json());
    }
}