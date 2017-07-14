import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PollsService } from '../../core/polls.service';
import { AuthService } from '../../core/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit, OnDestroy {

  poll;
  subscription;
  voteForm: FormGroup;

  constructor(private polls: PollsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private auth: AuthService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const pollId = params['id'];
      if (!pollId) {
        this.router.navigate(['/']);
      }
      this.polls.get(pollId).subscribe((poll) => {
        this.poll = poll;
      }, (error) => {
        this.toastr.error(error);
      });
    });

    this.voteForm = this.fb.group({
      option: [{value: '', disabled: false}],
      newOption: [{value: '', disabled: false}]
    });

    this.voteForm.controls['option'].valueChanges.subscribe((val) => {
      if (val) {
        this.voteForm.get('newOption').disable();
      } else if (this.voteForm.controls['newOption'].disabled) {
        this.voteForm.get('newOption').enable();
      }
    });

    this.voteForm.controls['newOption'].valueChanges.subscribe((val) => {
      if (val) {
        this.voteForm.get('option').disable();
      } else if (this.voteForm.controls['option'].disabled) {
        this.voteForm.get('option').enable();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  canDelete(poll) {
    const userId = this.auth.getUserId();
    if (userId) {
      return poll.createdBy === userId;
    }
    return false;
  }

  canCreateCustomOption() {
    return this.auth.isLoggedIn();
  }

  delete(poll) {
    this.polls.delete(poll._id)
      .subscribe(() => {
        this.router.navigate(['/polls']);
      }, (error) => {
        this.toastr.error(error);
      });
  }

  hasVotes(poll) {
    return poll && poll.options && poll.options.reduce((sum, option) => {
      return sum + option.votes;
    }, 0);
  }

  vote(vote) {
    let option;
    if (vote.option) {
      option = {id: vote.option};
    } else {
      option = {value: vote.newOption};
    }
    this.polls.vote(this.poll._id, option).subscribe((poll) => {
      this.poll = poll;
      this.voteForm.reset();
      this.toastr.info('Your vote has been counted');
    }, (error) => {
      this.toastr.error(error);
    });
  }

  isValid(vote) {
    return !!(vote.option || vote.newOption);
  }

}
