import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

import { User } from '../../../models/user'

@Component({
  selector: 'app-sign-up-tecnico',
  templateUrl: './sign-up-tecnico.component.html',
  styleUrls: ['./sign-up-tecnico.component.css']
})
export class SignUpTecnicoComponent implements OnInit {
  user: User = new User();

  errors: String;

  constructor(public usersService: UsersService, public router: Router) { }

  ngOnInit() {
  }

  signUpEvent(event): void {
    event.preventDefault()
    this.user.genero.toUpperCase()
    this.errors = ''
    this.usersService.signUpTecnico(this.user)
    .subscribe(
      () => {
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        this.errors = error.error.message
          ? `${ error.status }: ${ error.error.message }`
          : `${ error.status }: ${ error.error }`
      }
    )
  }

}
