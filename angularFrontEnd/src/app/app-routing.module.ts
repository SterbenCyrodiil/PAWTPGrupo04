import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    children: [
      // # Dashboard UTENTE
      {
        path: ':cc/last-request',
        component: UserRequestInfoComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      {
        path: ':cc/made-requests',
        component: UserRequestsComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      {
        path: ':cc/create-request',
        component: RequestAddComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      // # Dashboard TECNICO
      {
        path: 'request-list',
        component: TecnicoRequestListsComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Tecnico ]}
      },
      {
        path: 'open-requests',
        component: TecnicoRequestListsComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Tecnico ]}
      },
      // # Dashboard ADMIN
      {
        path: 'user-listings',
        component: AdminUserListsComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin ]}
      },
      {
        path: 'request-listings',
        component: AdminRequestListsComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin ]}
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'register-tecnico',
        component: SignUpTecnicoComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin ]}
      },
      // # Componentes Gerais
      {
        path: ':reqId/request-info',
        component: RequestInfoComponent,
      },
      {
        path: ':reqId/request-info-edit',
        component: RequestInfoEditComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Tecnico ]}
      },
      {
        path: ':usrId/user-info',
        component: UserInfoComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      {
        path: ':usrId/user-update',
        component: UserInfoEditComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin, Role.Utente ]}
      },
      {
        path: ':usrId/tecnico-info',
        component: UserTecnicoInfoComponent,
        canActivate: [ RoleGuardService ],
        data: { roles: [ Role.Admin ]}
      },
      {
        path: ':usrId/tecnico-update',
        canActivate: [ RoleGuardService ],
        component: UserTecnicoInfoEditComponent,
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
