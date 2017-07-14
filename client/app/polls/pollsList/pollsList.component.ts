import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollsService } from '../../core/polls.service';
import { AuthService } from '../../core/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-polls',
  templateUrl: './pollsList.component.html',
  styleUrls: ['./pollsList.component.scss']
})
export class PollsListComponent implements OnInit, OnDestroy {

  userId;
  pollList;
  subscription;

  constructor(private route: ActivatedRoute,
              private polls: PollsService,
              private toastr: ToastsManager,
              private auth: AuthService,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.polls.list().subscribe((polls) => {
        if (this.userId) {
          this.pollList = polls.filter(poll => {
            return poll.createdBy._id === this.userId;
          });
        } else {
          this.pollList = polls;
        }
      }, (error) => {
        this.toastr.error(error);
      });
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
