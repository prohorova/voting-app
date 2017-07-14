import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomHttpService {

  constructor(private http: Http,
              private router: Router) {}

  makeRequest(url, method, params?, body?) {
    return this.http.request(url, {method, params, body})
      .map(res => res.json())
      .catch(error => {
        if (error.status === 401) {
          sessionStorage.removeItem('user');
          this.router.navigate(['/login', {url: this.router.url.slice(1)}]);
          return Observable.throw('User is not logged in');
        }
        return Observable.throw(error.json().message || 'An error occurred');
      });
  }

}
