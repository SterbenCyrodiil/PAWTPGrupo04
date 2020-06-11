import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtTokenInterceptor } from './helpers/jwt-token.interceptor';
import { SessionEndInterceptor } from './helpers/session-end.interceptor';
// # Session
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
// # Dashboard
import { DashboardComponent } from './components/webpage/dashboard/dashboard.component';
import { DummyComponent } from './components/webpage/dummy/dummy.component';
import { StatisticsComponent } from './components/webpage/statistics/statistics.component';
// # Admin Dashboard
import { RequestListsComponent } from './components/requests/request-lists/request-lists.component';
import { UserListsComponent } from './components/users/user-lists/user-lists.component';
import { SignUpTecnicoComponent } from './components/users/sign-up-tecnico/sign-up-tecnico.component';
// # Tecnico Dashboard
import { OpenRequestsComponent } from './components/requests/open-requests/open-requests.component';
import { TecnicoRequestsComponent } from './components/requests/tecnico-requests/tecnico-requests.component';
// # Utente Dashboard
import { UserRequestInfoComponent } from './components/requests/user-request-info/user-request-info.component';
import { UserRequestsComponent } from './components/requests/user-requests/user-requests.component';
import { CreateRequestComponent } from './components/requests/create-request/create-request.component';
// # General
import { UserInfoComponent } from './components/users/user-info/user-info.component';
import { UserTecnicoInfoComponent } from './components/users/user-tecnico-info/user-tecnico-info.component';
import { RequestInfoComponent } from './components/requests/request-info/request-info.component';
import { RequestInfoEditComponent } from './components/requests/request-info-edit/request-info-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    // # Session
    SignInComponent,
    SignUpComponent,
    // # Dashboard
    DashboardComponent,
    DummyComponent,
    StatisticsComponent,
    // # Admin Dashboard
    RequestListsComponent,
    UserListsComponent,
    SignUpTecnicoComponent,
    // # Tecnico Dashboard
    OpenRequestsComponent,
    TecnicoRequestsComponent,
    // # Utente Dashboard
    UserRequestInfoComponent,
    UserRequestsComponent,
    CreateRequestComponent,
    // # General
    UserInfoComponent,
    UserTecnicoInfoComponent,
    RequestInfoComponent,
    RequestInfoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    // # Angular Materials
    MatButtonModule, 
    MatToolbarModule, 
    MatNativeDateModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionEndInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
