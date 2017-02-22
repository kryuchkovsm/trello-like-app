import { Component } from '@angular/core';
import { Auth }      from '../services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './app/components/html/home.component.html',
  styleUrls: ['./app/components/css/home.component.css'],
})

export class HomeComponent {
  constructor(private auth: Auth) {}
}
