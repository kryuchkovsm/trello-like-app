import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'login',
  templateUrl: './app/components/login.component/login.component.html',
  styleUrls: ['./app/components/login.component/login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {

    email: string = '';
    password: string = '';

    constructor(private authService:AuthService, private dataService: DataService ) { }

    ngOnInit() {

    }



    login(email, password) {
        if (email.trim() && password.trim())
            this.authService.login(email, password)
                .subscribe(user => console.log(user));

        this.dataService.getBoards()
            .subscribe(boards => { console.log(boards) });
    }
};
