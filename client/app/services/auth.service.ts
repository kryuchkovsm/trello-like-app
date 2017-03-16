import { Injectable }      from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Subject } from 'rxjs/Subject';

// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private baseUrl = 'http://localhost:3000';  // URL to web api

    private loginState = { isLoggedIn: false, email: undefined};

    private userLoggedSource = new Subject<any>();
    userLogged$ = this.userLoggedSource.asObservable();

    announceLogin(loginState: any) {
        this.userLoggedSource.next(loginState);
    }

    constructor(private http:Http, private router: Router) {
        this.announceLogin(this.loginState);
    }

    public login(email:string, password:string) {
        let url = `${this.baseUrl}/login`;
        return this.http.post(url, JSON.stringify( {email: email, password: password} ), {headers: this.headers})
            .map(res => {
                let result = res.json()
                if (result.user) {

                    // TODO refactor user model in both sides
                    // TODO refactor to move this section out from loin and signup methods
                    let user = {_id : result.user._id, email: result.user.email };
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    this.loginState = { isLoggedIn:true, email:user.email }; 
                    this.announceLogin(this.loginState);
                    this.router.navigate(['/dashboard']);
                }
            })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loginState.isLoggedIn = false;
        this.announceLogin(this.loginState);
    }

    public signup(email:string, password:string) {
        let url = `${this.baseUrl}/signup`;
        return this.http.post(url, JSON.stringify( {email: email, password: password} ), {headers: this.headers})
            .map(res => {
                let result = res.json()
                if (result.user) {
                    console.log('signup service');
                    // TODO refactor user model in both sides
                    let user = {_id : result.user._id, email: result.user.email };
                    localStorage.setItem('currentUser', JSON.stringify(user));                    
                    this.loginState = { isLoggedIn:true, email:user.email }; 
                    this.announceLogin(this.loginState);
                    this.router.navigate(['/dashboard']);
                }
            })
    }    
}