import { Component, OnInit, OnDestroy }        from '@angular/core';
import { AuthService }      from '../../services/auth.service'
import { Subscription }   from 'rxjs/Subscription';
import { DragulaService }                   from 'ng2-dragula'

@Component({
    moduleId: module.id,
    selector: 'navbar-component',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavBarComponent implements OnInit, OnDestroy {
    userEmail: string = 'user email from localstorage';
    isLoggedIn: boolean;
    boardListVisible: boolean;

    subscription: Subscription;
    
    constructor(
        private authService: AuthService,
        private dragulaService: DragulaService) {
        // in SPA service login
        authService.userLogged$.subscribe(
            loginState => {
                this.setUser()
            });

        // on page refresh in browser
        this.setUser();
    }

    setUser() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.userEmail = currentUser.email;
            this.isLoggedIn = true;
        }
        else {
            this.isLoggedIn = false;
            this.boardListVisible = false;
        }

    }

    // logout() {
    //     this.isLoggedIn = false;
    //     this.boardListVisible = false;
    //     this.authService.logout();
    //     this.dragulaService.destroy('dragula-lists');
    //     this.dragulaService.destroy('dragula-tickets');
    // }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
    }


    toggleBoardList() {
        this.boardListVisible = !this.boardListVisible;
    }

    onCloseBoardList() {
        this.boardListVisible = false;
    }

}