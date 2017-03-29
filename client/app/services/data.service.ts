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

    // TODO move to corresponding place, when neccessary
    private hasRights: boolean;
    
    constructor(private http:Http,
                private authHttp: AuthHttp) { }

    // ====================================================================
    // =========================   BOARD   ================================
    // ====================================================================

    public getBoard(boardId) {
        const url = `${this.apiUrl}/board?boardId=${boardId}`;
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }

    // public getBoard(boardId) {
    //         const url = `${this.apiUrl}/board?boardId=${boardId}`;
    //         return this.authHttp
    //             .get(url)
    //             .toPromise()
    //             .then(res => res.json())
    //             .catch(this.handleError);
    //     }
    
    public addBoard(board) {
        const url = `${this.apiUrl}/board`;
        return this.authHttp
            .post( url, JSON.stringify( { board } ), {headers: this.headers})
            .map(res => res.json());
    }
    
    
    public updateBoard(board) {
        const url = `${this.apiUrl}/board`;
        return this.authHttp
            .put(url, JSON.stringify( { board } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteBoard(board) {
        const url = `${this.apiUrl}/board`;
        let body = JSON.stringify({board});
        let options = new RequestOptions({
            headers: this.headers,
            body: body
        });
        return this.authHttp
            .delete( url, options)
            .map(res => res.json());
    }
    
    public updateSharedBoarList() {
        const url = `${this.apiUrl}/board?boardId=all`;
        this.authHttp
            .get(url)
            .map(res => res.json())
            .subscribe( boards => this.sharedBoarList.next(boards));
    }

    
    getRights():boolean {
        return this.hasRights;
    }

    setRights(value:boolean) {
        this.hasRights = value;
    }
    // ====================================================================
    // =========================   LIST    ================================
    // ====================================================================

    public getLists(boardId){
        const url = `${this.apiUrl}/list?boardId=${boardId}`;
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }
    
    public addList(list) {
        const url = `${this.apiUrl}/list`;
        return this.authHttp
            .post(url, JSON.stringify( { list } ), {headers: this.headers})
            .map(res => res.json());
    }

    public updateList(list) {
        const url = `${this.apiUrl}/list`;
        return this.authHttp
            .put(url, JSON.stringify( { list } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteList(list) {
        const url = `${this.apiUrl}/list`;
        let body = JSON.stringify( { list } );
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
        const url = `${this.apiUrl}/ticket?listId=${listId}`;
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }

    public getTicket(ticket){
        const url = `${this.apiUrl}/ticket?ticketId=${ticket._id}&boardId=${ticket.boardId}`;
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }
    
    public addTicket(ticket) {
        const url = `${this.apiUrl}/ticket`;
        return this.authHttp
            .post(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }
    
    public updateTicket(ticket) {
        const url = `${this.apiUrl}/ticket`;
        return this.authHttp
            .put(url, JSON.stringify( { ticket } ), {headers: this.headers})
            .map(res => res.json());
    }

    public deleteTicket(ticket) {
        const url = `${this.apiUrl}/ticket`;
        let body = JSON.stringify( { ticket } );
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
        const url = `${this.apiUrl}/assigneduser?_id=${boardId}`;
        return this.authHttp
            .get(url)
            .map(res => res.json());
    }
    
    public assignUser(relation) {
        const url = `${this.apiUrl}/assigneduser`;
        return this.authHttp
            .post(url, JSON.stringify( relation ), {headers: this.headers})
            .map(res => res.json());
    }

    public removeAssignedUser( relation) {
        const url = `${this.apiUrl}/assigneduser`;
        let body = JSON.stringify( relation );
        let options = new RequestOptions({
            headers: this.headers,
            body: body });
        return this.authHttp
            .delete( url, options)
            .map(res => res.json());
    }
    
    public unsubscribeBoard( board ) {
        const url = `${this.apiUrl}/assigneduser`;
        let body = JSON.stringify( board );
        let options = new RequestOptions({
            headers: this.headers,
            body: body });
        return this.authHttp
            .delete( url, options)
            .map(res => res.json());
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}


