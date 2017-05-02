import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  poll = {
    id: 1,
    title: 'Poll title',
    description: 'Poll description',
    options: [
      {
        value: 'option 1',
        votes: 1
      },
      {
        value: 'option 2',
        votes: 3
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
