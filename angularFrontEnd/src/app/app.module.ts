import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { MatGridListModule, MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule } from '@angular/material';
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
import { StatisticsComponent } from './components/webpage/statistics/statistics.component';
// # Admin Dashboard
import { AdminRequestListsComponent } from './components/requests/admin-request-lists/admin-request-lists.component';
import { AdminUserListsComponent } from './components/users/admin-user-lists/admin-user-lists.component';
import { SignUpTecnicoComponent } from './components/users/sign-up-tecnico/sign-up-tecnico.component';
// # Tecnico Dashboard
import { TecnicoRequestListsComponent } from './components/requests/tecnico-request-lists/tecnico-request-lists.component';
// # Utente Dashboard
import { UserRequestInfoComponent } from './components/requests/user-request-info/user-request-info.component';
import { UserRequestsComponent } from './components/requests/user-requests/user-requests.component';
import { RequestAddComponent } from './components/requests/request-add/request-add.component';
// # General
import { UserInfoComponent } from './components/users/user-info/user-info.component';
import { UserInfoEditComponent } from './components/users/user-info-edit/user-info-edit.component';
import { UserTecnicoInfoComponent } from './components/users/user-tecnico-info/user-tecnico-info.component';
import { UserTecnicoInfoEditComponent } from './components/users/user-tecnico-info-edit/user-tecnico-info-edit.component';
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
    StatisticsComponent,
    // # Admin Dashboard
    AdminRequestListsComponent,
    AdminUserListsComponent,
    SignUpTecnicoComponent,
    // # Tecnico Dashboard
    TecnicoRequestListsComponent,
    // # Utente Dashboard
    UserRequestInfoComponent,
    UserRequestsComponent,
    RequestAddComponent,
    // # General
    UserInfoComponent,
    UserTecnicoInfoComponent,
    RequestInfoComponent,
    RequestInfoEditComponent,
    UserInfoEditComponent,
    UserTecnicoInfoEditComponent,
    TecnicoRequestListsComponent,
    AdminRequestListsComponent,
    AdminUserListsComponent
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
    MatListModule,
    MatGridListModule
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
