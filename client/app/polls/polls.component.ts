import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  polls = [
    {id: 1, title: 'Poll1', description: 'description'},
    {id: 1, title: 'Poll1', description: 'description'},
    {id: 1, title: 'Poll1', description: 'description'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
