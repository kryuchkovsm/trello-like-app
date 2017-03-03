import { Injectable, EventEmitter, Output }      from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User }     from '../classes/user'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private authUrl = 'http://localhost:3000/login';  // URL to web api

    private isLoggedIn = false;
    
    user: User;
    
    constructor(private http:Http, private router: Router) { }

    public login(email:string, password:string) {

        let user = {email: email, password: password};
        let url = `${this.authUrl}`;

        return this.http.post(url, JSON.stringify( user ), {headers: this.headers})
            .map(res => res.json());
    }

    public setUser(user) {
        this.user = user;
        this.isLoggedIn = true;
    }


    public getLoginStatus() {
        return this.isLoggedIn;
    }

    public getUserEmail() {
        return this.user.local.email;
    }

    // not used
    public getUser() {
        return this.user;
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
}