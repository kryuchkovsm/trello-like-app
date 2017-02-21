import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'toolbar',
    templateUrl: './app/components/html/toolbar.component.html',
    styleUrls: ['./app/components/css/toolbar.component.css'],
    providers:[AuthService]
})


export class ToolbarComponent {
    constructor(private auth: AuthService) {}
    login() {
        this.auth.login();
    }
    logout() {
        this.auth.logout();
    }
}



