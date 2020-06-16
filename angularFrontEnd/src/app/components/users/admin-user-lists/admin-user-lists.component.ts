import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users.service';

import { User } from '../../../models/user'

@Component({
  selector: 'app-admin-user-lists',
  templateUrl: './admin-user-lists.component.html',
  styleUrls: ['./admin-user-lists.component.css']
})
export class AdminUserListsComponent implements OnInit {
  tecnicos: User[];
  utentes: User[];

  errors: String;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getAllUtentes()
      .subscribe( 
        (utentes: User[]) => {
          this.utentes = utentes;
        },
        (error) => {
          this.errors = error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      );

    this.usersService.getAllTecnicos()
      .subscribe( 
        (tecnicos: User[]) => {
          this.tecnicos = tecnicos;
        },
        (error) => {
          this.errors = error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      )
  }

}
