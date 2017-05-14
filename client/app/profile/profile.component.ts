import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  passwordForm: FormGroup;
  user;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.user = this.auth.getUserInfo();
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: {value: this.user.name, disabled: true},
      email: {value: this.user.email, disabled: true}
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  changePassword(passwords) {
    const data = Object.assign(passwords, {userId: this.user._id});
    this.auth.changePassword(data)
      .subscribe(() => {
        this.toastr.info('Password changed successfully');
        this.passwordForm.reset(); // reset not working as expected, see https://github.com/angular/material2/issues/4190
      },
      (error) => {
        this.toastr.error(error);
      });
  }

}
