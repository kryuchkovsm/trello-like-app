import { Component } from '@angular/core';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './app/components/html/login.component.html',
  styleUrls: ['./app/components/css/login.component.css'],
})
export class LoginComponent {
  constructor(private auth: Auth) {
    this.auth.handleAuthentication();
  }
};
