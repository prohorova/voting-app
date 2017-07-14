import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  url;
  subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private auth: AuthService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.url = params.url || '';
    });
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/.+\@.+\..+/)])],
      password: ['', Validators.required],
    });
  }

  submit(user) {
    this.auth.submit(true, user).subscribe(() => {
      this.router.navigate([`/${this.url}`]);
    }, (error) => {
      this.toastr.error(error);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
