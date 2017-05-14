import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import config from '../shared/config';

@Injectable()
export class AuthService {

  constructor(private http: CustomHttpService) {}

  submit(loggingIn, user) {
    const action = loggingIn ? 'login' : 'register';
    const url = `${config.baseUrl}/api/${action}`;
    return this.http.makeRequest(url, 'post', null, user)
      .map(user => sessionStorage.setItem('user', JSON.stringify(user)));
  }

  isLoggedIn() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    sessionStorage.removeItem('user');
    return this.http.makeRequest(`${config.baseUrl}/api/logout`, 'get');
  }

  getUserId() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && user._id;
  }

}
