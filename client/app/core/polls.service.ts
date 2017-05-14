import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import config from '../shared/config';


@Injectable()
export class PollsService {

  constructor(private http: CustomHttpService) { }

  list() {
    return this.http.makeRequest(`${config.baseUrl}/api/polls`, 'get');
  }

  get(id) {
    return this.http.makeRequest(`${config.baseUrl}/api/polls/${id}`, 'get');
  }

  create(poll) {
    return this.http.makeRequest(`${config.baseUrl}/api/polls`, 'post', null, poll);
  }

  delete(id) {
    return this.http.makeRequest(`${config.baseUrl}/api/polls/${id}`, 'delete');
  }

  vote(pollId, option) {
    return this.http.makeRequest(`${config.baseUrl}/api/polls/vote/${pollId}`,
      'post', null, option);
  }

}
