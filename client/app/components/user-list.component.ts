'use strict'

import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

interface User {
    id: number,
    name: string,
    image: string
}

@Component({
    selector: 'user-list',
    template: `
    <h2>Users</h2>
    <ul>
      <li *ngFor="let user of users">
        <img [src]="user.image">
        <span>{{user.name}}</span>
      </li>
    </ul>
  `
})
export class UserListComponent implements OnInit {
    users: User[];

    constructor(private authHttp: AuthHttp) {}

    ngOnInit() {
        this.authHttp.get('/api/users')
            .map(res => res.json())
            .subscribe(
                users => this.users = users,
                error => console.log(error)
            );
    }
}