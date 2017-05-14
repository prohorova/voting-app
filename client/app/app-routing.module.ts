import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PollsListComponent } from './polls/pollsList/pollsList.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PollComponent } from './polls/poll/poll.component';
import { CreateComponent } from './polls/create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './core/auth-guard.service';
import { UnauthGuardService } from './core/unauth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthGuardService]
  },
  {
    path: 'polls',
    component: PollsListComponent
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'polls/:id',
    component: PollComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
