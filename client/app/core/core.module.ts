import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { PollsService } from './polls.service';
import { AuthGuardService } from './auth-guard.service';
import { UnauthGuardService } from './unauth-guard.service';
import { CustomHttpService } from './custom-http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    AuthService,
    PollsService,
    AuthGuardService,
    UnauthGuardService,
    CustomHttpService
  ]
})
export class CoreModule { }
