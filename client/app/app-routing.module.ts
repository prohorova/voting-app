import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PollsComponent } from './polls/polls.component';
import { LoginComponent } from './login/login.component';
import { PollComponent } from './poll/poll.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'polls', component: PollsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edit', component: EditComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'poll/:id', component: PollComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
