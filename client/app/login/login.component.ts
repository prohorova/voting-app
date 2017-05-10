import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/.+\@.+\..+/)])],
      password: ['', Validators.required],
    })
  }

  submit(user) {
    this.auth.submit(true, user).subscribe(() => {
      this.router.navigate(['/']);
    }, (error) => {
      this.toastr.error(error);
    });
  }

}
