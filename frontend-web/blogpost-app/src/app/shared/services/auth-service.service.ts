import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userRoleNormal:string = "user";
  userRoleEditor:string = "editor";

  private loginState = new BehaviorSubject<boolean>(this.isLoggedIn());
  loginState$ = this.loginState.asObservable();

  users:User[] = [
    new User("john@test.com", "pxl", this.userRoleEditor, 1),
    new User("george@test.com", "pxl", this.userRoleEditor, 2),
    new User("user@test.com", "pxl", this.userRoleNormal, 3),
  ]

  login(email: string, password: string): boolean {
    const foundUser = this.users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem('userRole', foundUser.role);
      localStorage.setItem('userId', foundUser.id.toString());
      this.loginState.next(true);
      return true;
    } else {
      return false;
    }
  }

  logout() : void{
    localStorage.setItem('userRole', '');
    localStorage.setItem('userId', '');
    this.loginState.next(false); 
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }
}
