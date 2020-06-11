import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

import { User } from '../../../models/user'

@Component({
  selector: 'app-sign-up', 
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();

  errors: String;

  constructor(public usersService: UsersService, public router: Router) { }

  ngOnInit() { }

  signUpEvent(event): void {
    event.preventDefault()
    this.errors = ''
    this.usersService.signUp(this.user)
    .subscribe(
      () => {
        this.router.navigate(['/sign-in'])
      },
      (error) => {
        this.errors = `${ error.status }: ${ error.error.message }`
      }
    )
  }
}
