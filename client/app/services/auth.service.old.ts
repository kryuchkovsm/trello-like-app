import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { myConfig }        from './auth.config.old';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'


// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class Auth {
    // Configure Auth0
    auth0 = new auth0.WebAuth({
        domain: myConfig.domain,
        clientID: myConfig.clientID,
        redirectUri: myConfig.callbackURL,
        responseType: 'token id_token'
    });

    constructor(private router: Router, private http:Http) {
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (err) {
                console.log(err);
            }
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('authResult:');
                console.log(authResult);
                this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
                    console.log(err);
                    console.log('userInfo:')
                    console.log(user);
                });
                window.location.hash = '';
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                this.router.navigate(['/home']);
            } else if (authResult && authResult.error) {
                alert(`Error: ${authResult.error}`);
            }
        });
    }

    public login(username: string, password: string): void {
        this.auth0.client.login({
            realm: 'Username-Password-Authentication',
            username,
            password
        }, (err, authResult) => {
            this.setUser(authResult);
            if (err) {
                alert(`Error: ${err.description}`);
                return;
            }
            if (authResult && authResult.idToken && authResult.accessToken) {
                console.log('authResult:');
                console.log(authResult);
                this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
                    console.log(err);
                    console.log('userInfo:')
                    console.log(user);
                });
                this.setUser(authResult);
                this.router.navigate(['/home']);
            }
        });
    }

    public signup(email, password): void {
        this.auth0.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email,
            password,
        }, function(err) {
            if (err) {
                alert(`Error: ${err.description}`);
            }
        });
    }

    public loginWithGoogle(): void {
        this.auth0.authorize({
            connection: 'google-oauth2',
        });
    }

    public loginWithFacebook():void {
        this.auth0.authorize({
            connection: 'facebook',
        });
    }

    public isAuthenticated(): boolean {
        // Check whether the id_token is expired or not
        return tokenNotExpired();
    }

    public logout(): void {
        // Remove token from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
    }

    private setUser(authResult): void {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    }
}





