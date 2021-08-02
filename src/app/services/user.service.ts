import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../interfaces/User';
import { HttpClient, HttpHeaders} from '@angular/common/http'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  public addUser(user: User) : Observable<User>{
    // Password encryption?
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }


}
