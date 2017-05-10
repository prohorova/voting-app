import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import config from '../shared/config';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PollsService {

  constructor(private http: Http) { }

  list() {
    return this.http.get(`${config.baseUrl}/api/polls`)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json().message || 'An error occurred'));
  }

  get(id) {
    return this.http.get(`${config.baseUrl}/api/polls/${id}`)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json().message || 'An error occurred'));
  }

  create(poll) {
    return this.http.post(`${config.baseUrl}/api/polls`, poll)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json().message || 'An error occurred'));
  }

  delete(id) {
    return this.http.delete(`${config.baseUrl}/api/polls/${id}`)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json().message || 'An error occurred'));
  }

  vote(pollId, option) {
    return this.http.post(`${config.baseUrl}/api/polls/vote/${pollId}`, option)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json().message || 'An error occurred'));
  }

}
