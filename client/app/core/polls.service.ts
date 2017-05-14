import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { environment } from '../../environments/environment';


@Injectable()
export class PollsService {

  constructor(private http: CustomHttpService) { }

  list() {
    return this.http.makeRequest(`${environment.baseUrl}/api/polls`, 'get');
  }

  get(id) {
    return this.http.makeRequest(`${environment.baseUrl}/api/polls/${id}`, 'get');
  }

  create(poll) {
    return this.http.makeRequest(`${environment.baseUrl}/api/polls`, 'post', null, poll);
  }

  delete(id) {
    return this.http.makeRequest(`${environment.baseUrl}/api/polls/${id}`, 'delete');
  }

  vote(pollId, option) {
    return this.http.makeRequest(`${environment.baseUrl}/api/polls/vote/${pollId}`,
      'post', null, option);
  }

}
