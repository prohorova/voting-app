import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PollsComponent } from './polls/polls.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PollComponent } from './poll/poll.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PollsComponent,
    LoginComponent,
    NavComponent,
    PollComponent,
    EditComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
