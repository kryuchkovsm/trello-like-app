import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { DataService } from "../../services/data.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './app/components/login.component/login.component.html',
  styleUrls: ['./app/components/login.component/login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {

    email: string = '';
    password: string = '';
    info: string = '';

    constructor(private authService:AuthService, private router: Router ) { }

    ngOnInit() {

    }
    
    // TODO process empty fields in servise
    login(email, password) {

        if (!email.trim())
            return this.info = 'EMail should not be empty';

        if (!password.trim())
            return this.info = 'Password should not be empty';

        this.authService.login(email, password)
            .subscribe(result => 
            {
                console.log(result)
                if (result.info)
                    return this.info = result.info.loginMessage;
                if (result.user)
                    this.authService.setUser = result.user;
                    this.router.navigate(['/dashboard'])
            });
    }
};
