import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PollsService } from '../core/polls.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  pollList;

  constructor(private polls: PollsService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.polls.list().subscribe((polls) => {
      this.pollList = polls;
    }, (error) => {
      this.toastr.error(error);
    })
  }

}
