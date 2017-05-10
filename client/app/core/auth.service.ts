import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import config from '../shared/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  submit(loggingIn, user) {
    const action = loggingIn ? 'login' : 'register';
    const url = `${config.baseUrl}/api/${action}`;
    return this.http.post(url, user)
      .map(res => res.json())
      .map(user => sessionStorage.setItem('user', JSON.stringify(user)))
      .catch(error => Observable.throw(error.json().message || 'An error occurred'))
  }

  isLoggedIn() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    sessionStorage.removeItem('user');
    return this.http.get(`${config.baseUrl}/api/logout`);
  }

  getUserId() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && user._id;
  }

}
