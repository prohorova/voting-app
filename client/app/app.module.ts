import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PollsListComponent } from './polls/pollsList/pollsList.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './nav/nav.component';
import { PollComponent } from './polls/poll/poll.component';
import { CreateComponent } from './polls/create/create.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PollsListComponent,
    LoginComponent,
    NavComponent,
    PollComponent,
    CreateComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
