import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PollsComponent } from './polls/polls.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PollComponent } from './poll/poll.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'polls', component: PollsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create', component: CreateComponent},
  {path: 'create/:id', component: CreateComponent},
  {path: 'polls/:id', component: PollComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
