import { DataService }      from '../services/data.service';
import { Component, OnInit }        from '@angular/core';


@Component({
    selector: 'my-app',
    providers: [ DataService ],
    templateUrl: './app/components/html/app.component.html',
    styleUrls: ['./app/components/css/app.component.css'],
})

export class AppComponent implements OnInit {

    dashBoardVisible = false;
    isAuthenticated = false;
    
    // user:User; // =  {_id: "123", local: {email:'xz@xz.xz', password: ''}} ;
    
    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        
    }

    
    
    logout() {
        this.dataService.logout();
    }
    
    toggleDashBoard() {
        this.dashBoardVisible = !this.dashBoardVisible;
    }
}