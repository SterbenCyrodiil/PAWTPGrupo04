import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
// # Guard Services
import { RoleGuardService } from './helpers/role.guard'
import { Role } from './models/role'

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ RoleGuardService ],
    children: [
      // # Dashboard UTENTE
      {
        path: ':utente/last-request',
        component: UserRequestInfoComponent,
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      {
        path: ':utente/made-requests',
        component: UserRequestsComponent,
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      {
        path: 'create-request',
        component: CreateRequestComponent,
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      // # Dashboard TECNICO
      {
        path: ':tecnico/request-list',
        component: TecnicoRequestsComponent,
        data: { roles: [ Role.Admin, Role.Tecnico ]}
      },
      {
        path: 'open-requests',
        component: OpenRequestsComponent,
        data: { roles: [ Role.Admin, Role.Tecnico ]}
      },
      // # Dashboard ADMIN
      {
        path: 'user-listings',
        component: UserListsComponent,
        data: { roles: [ Role.Admin ]}
      },
      {
        path: 'request-listings',
        component: RequestListsComponent,
        data: { roles: [ Role.Admin ]}
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        data: { roles: [ Role.Admin, Role.Tecnico, Role.Utente ]}
      },
      {
        path: 'register-tecnico',
        component: SignUpTecnicoComponent,
        data: { roles: [ Role.Admin ]}
      },
      // # Componentes Gerais
      {
        path: ':request/request-info',
        component: RequestInfoComponent,
        data: { roles: [ Role.Admin, Role.Tecnico, Role.Utente ]}
      },
      {
        path: ':request/request-info-edit',
        component: RequestInfoEditComponent,
        data: { roles: [ Role.Admin, Role.Tecnico ]}
      },
      {
        path: ':user/user-info',
        component: UserInfoComponent,
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      {
        path: ':request/tecnico-info',
        component: UserTecnicoInfoComponent,
        data: { roles: [ Role.Admin ]}
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
