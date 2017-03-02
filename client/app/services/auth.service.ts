import { Injectable }      from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'



@Injectable()
export class AuthService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private authUrl = 'http://localhost:3000/login';  // URL to web api

    private isLoggedIn = false;

    constructor(private http:Http) { }

    public login(email:string, password:string) {
        let user = {email: email, password: password};
        let url = `http://localhost:3000/login`;
        return this.http
          .post(url, JSON.stringify( { user } ), {headers: this.headers})
          .map(res => res.json());
    }

    // public addBoard(board) {
    //     return this.http
    //         .post('http://localhost:3000/api/addboard', JSON.stringify( { board } ), {headers: this.headers})
    //         .map(res => res.json());
    // }

    // public getUser() {
    //     const url = `${this.apiUrl}/user`
    //     return this.http.get(url)
    //         .map(res => res.json());
    // }

    public logout() {
        window.location.href = '/logout';
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http
        //     .post('http://localhost:3000/logout', {'action':'logout'}, options)
        //     .map(res => res.json());
    }

    // public getUserEmail() {
    //     const url = `${this.authUrl}/useremail`;
    //     return this.http.get(url)
    //         .map(res => res.json());
    // }


}