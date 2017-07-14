import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: CustomHttpService) {}

  submit(loggingIn, user) {
    const action = loggingIn ? 'login' : 'register';
    const url = `${environment.baseUrl}/api/${action}`;
    return this.http.makeRequest(url, 'post', null, user)
      .map(data => sessionStorage.setItem('user', JSON.stringify(data)));
  }

  isLoggedIn() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    sessionStorage.removeItem('user');
    return this.http.makeRequest(`${environment.baseUrl}/api/logout`, 'get');
  }

  getUserId() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && user._id;
  }

  getUserInfo() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  changePassword(data) {
    return this.http.makeRequest(`${environment.baseUrl}/api/change-password`, 'post', null, data);
  }

}
