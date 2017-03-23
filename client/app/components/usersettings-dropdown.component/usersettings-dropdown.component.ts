import { Component, OnInit } from '@angular/core';
// import { UserService }      from '../../services/user.service';
// import { User }         from '../../../classes/user';


@Component({
  moduleId: module.id,
  selector: 'usersettings-dropdown-component',
  templateUrl: './usersettings-dropdown.component.html',
  styleUrls: [ './usersettings-dropdown.component.css'],
})

export class UserSettingsDropdownComponent implements OnInit {
  //
  // users: User[] = [];
  // currentUser: User;
  //
  // constructor(private userService: UserService) {
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // }
  //
  //
  ngOnInit() {
    // this.loadAllUsers();
  }
  //
  // deleteUser(id: number) {
  //   this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  // }
  //
  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }
  
}

