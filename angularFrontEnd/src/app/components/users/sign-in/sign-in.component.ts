import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  cc: String;
  password: String;

  errors: String;

  constructor(public sessionService: SessionService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // # User pode chegar ao /login pelo redirect ou quando a sessão termina
    this.route.queryParams.subscribe((params) => { 
        if (params.expired) {
          this.errors = 'Your session was expired!'
        } else if (params.redirected) {
          this.errors = 'You have been redirected. You must Sign-In to use our Website!'
        }
      })
  }

  signInEvent(event): void {
    event.preventDefault()
    this.errors = ''
    this.sessionService.signIn(this.cc, this.password)
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
