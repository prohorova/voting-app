import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PollsService } from '../../core/polls.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  pollForm: FormGroup;

  constructor(private fb: FormBuilder,
              private polls: PollsService,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.pollForm = this.fb.group({
      name: ['', Validators.required],
      options: this.fb.array([this.initOption(), this.initOption()])
    });
  }

  addOption() {
    const optionsControl = <FormArray>this.pollForm.controls['options'];
    optionsControl.push(this.initOption());
  }

  getOptionName(i) {
    return `Option ${i + 1}`;
  }

  initOption() {
    return this.fb.group({
      value: ['', Validators.required]
    });
  }

  removeOption(i) {
    const optionsControl = <FormArray>this.pollForm.controls['options'];
    optionsControl.removeAt(i);
  }

  submit(poll) {
    this.polls.create(poll).subscribe((data: any) => {
      this.router.navigate([`/polls/${data._id}`]);
    }, (error) => {
      this.toastr.error(error);
    });
  }

}
