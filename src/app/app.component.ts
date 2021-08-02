import { Component } from '@angular/core';
import {UserService} from './services/user.service'


import {User} from './interfaces/User'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  users : User[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => this.users = users);
  }

  addUser(user: User){
    this.userService.addUser(user).subscribe((user) => {this.users.push(user); console.log(this.users)});

  }
}
