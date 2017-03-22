import { Injectable }      from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private baseUrl = 'http://localhost:3000';  // URL to web api
    private loginState = { isLoggedIn: false, email: undefined};
    public jwt:string;

    private userLoggedSource = new Subject<any>();
    userLogged$ = this.userLoggedSource.asObservable();

    announceLogin(loginState: any) {
        this.userLoggedSource.next(loginState);
    }

    constructor(private http:Http, private router: Router) {
        this.announceLogin(this.loginState);
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.jwt = currentUser && currentUser.token;
    }

    public authenticate() {

    }

    public login(email:string, password:string): Observable<boolean> {
        let url = `${this.baseUrl}/login`;
        return this.http.post(url, JSON.stringify( {email: email, password: password} ), {headers: this.headers})
            .map((response: Response) => {
                console.log('login angular2 ')
                
                let user = response.json().user;
                console.log(user);
                
                let jwt =  user && user.jwt;
                if (jwt) {
                    this.jwt = jwt;
                    localStorage.setItem('currentUser', JSON.stringify({ _id: user._id, email: user.email, jwt: jwt }));
                    this.loginState = { isLoggedIn: true, email: user.email }; 
                    this.announceLogin(this.loginState);
                    this.router.navigate(['/dashboard']);
                    return true
                }
                else
                    return false;
            })
    }

    public isLoggedIn() {
        console.log(this.jwt);
        console.log(tokenNotExpired());
        console.log(tokenNotExpired(this.jwt));
        return true;
    }

    public logout() {
        // remove user from local storage to log user out
        this.jwt = null;
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
                    let user = {_id : result.user._id, email: result.user.email };
                    localStorage.setItem('currentUser', JSON.stringify(user));                    
                    this.loginState = { isLoggedIn:true, email:user.email }; 
                    this.announceLogin(this.loginState);
                    this.router.navigate(['/dashboard']);
                }
            })
    }    
}