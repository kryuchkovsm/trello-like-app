import { DataService }      from '../services/data.service';
import { Component, OnInit }        from '@angular/core';
// import { User } from './classes/user';

@Component({
    selector: 'my-app',
    providers: [ DataService ],
    templateUrl: './app/components/html/app.component.html',
    styleUrls: ['./app/components/css/app.component.css'],
})

export class AppComponent implements OnInit {

    isAuthenticated:boolean = false

    dashBoardVisible = false;

    ngOnInit() {
        
    }

    // logout() {
    //     this.dataService.logout();
    // }
    
    // toggleDashBoard() {
    //     this.dashBoardVisible = !this.dashBoardVisible;
    // }

    // public getUserEmail() {
    //     this.dataService.getUserEmail()
    //         .subscribe(useremail => { this.userEmail = useremail});
    // }

    // public getUser() {
    //         this.dataService.getUser()
    //             .subscribe(user => {
    //                 this.user = user;
    //                 console.log('user =>');
    //                 console.log(user);
    //             });
    //         console.log('getUser()');
    //         console.log(this.user);
    // }
    
    // public getUserEmail() {
    //     this.dataService.getUserEmail()
    //         .then(useremail => { this.userEmail = useremail});
    // }
}