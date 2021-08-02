import { Component, OnInit, Input } from '@angular/core';
import { User} from '../../interfaces/User'
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.sass']
})
export class UserDataComponent implements OnInit {
  @Input() user: User = {
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: ""
  };
  constructor() { }

  ngOnInit(): void {
  }

}
