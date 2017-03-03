import { AuthService }      from '../../services/auth.service';
import { Component, OnInit }        from '@angular/core';
// import { User } from './classes/user';

@Component({
    selector: 'my-app',
    providers: [ AuthService ],
    templateUrl: './app/components/app.component/app.component.html',
    styleUrls: ['./app/components/app.component/app.component.css'],
})

export class AppComponent implements OnInit {

    isAuthenticated:boolean;
    boardListVisible: boolean;
    userEmail:string;

    constructor (private authService: AuthService) { }

    ngOnInit() {
        this.isLoggedIn();
    }

    toggleBoardList() {
        this.boardListVisible = !this.boardListVisible;
    }

    logout() {

    }

    public isLoggedIn() {
        console.log('app component isLoggedIn');
        this.isAuthenticated = this.authService.getLoginStatus();
        if (this.isAuthenticated) 
            this.userEmail = this.authService.getUserEmail();
    }

}