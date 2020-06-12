import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
  // form: FormGroup;

  errors: String;

  constructor(public usersService: UsersService, public router: Router) { }

  ngOnInit() {
    // this.form = this.fb.group({
    //   CC: ['', Validators.required, Validators.pattern(/^[0-9]{8} [0-9] [A-Z]{2}[0-9]$/)],
    //   password: ['', Validators.required],
    //   gender: ['', Validators.required]
    // })
  }

  // submitForm() {
  //   event.preventDefault()
  //   const formData: FormData = new FormData();
  //   formData.append("name", this.form.get('name').value);
  //   formData.append("avatar", this.form.get('avatar').value);

  //   this.errors = ''
  //   this.usersService.signUp(formData)
  //     .subscribe(
  //       () => {
  //         this.router.navigate(['/sign-in'])
  //       },
  //       (error) => {
  //         this.errors = error.error.message
  //           ? `${ error.status }: ${ error.error.message }`
  //           : `${ error.status }: ${ error.error }`
  //       }
  //     )
  // }

  signUpEvent(event): void {
    event.preventDefault()
    this.user.genero.toUpperCase()
    this.errors = ''
    this.usersService.signUp(this.user)
    .subscribe(
      () => {
        this.router.navigate(['/sign-in'])
      },
      (error) => {
        this.errors = error.error.message
          ? `${ error.status }: ${ error.error.message }`
          : `${ error.status }: ${ error.error }`
      }
    )
  }
}
