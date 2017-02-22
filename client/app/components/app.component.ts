import { DataService }      from '../services/data.service';
import { Component }        from '@angular/core';
import { Auth }             from '../services/auth.service';


@Component({
    selector: 'my-app',
    providers: [ Auth, DataService ],
    templateUrl: './app/components/html/app.component.html',
    styleUrls: ['./app/components/css/app.component.css'],
})

export class AppComponent {
    constructor(private auth: Auth, private dataservice: DataService) {
        this.auth.handleAuthentication();
    }
}