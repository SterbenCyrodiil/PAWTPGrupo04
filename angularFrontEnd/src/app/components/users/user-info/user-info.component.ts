import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

import { User } from '../../../models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo: User = new User();
  routeUser: String;

  errors: String;
 
  constructor(public usersService: UsersService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeUser = this.route.snapshot.params['usrId'];

    this.usersService.getUserInfo(this.routeUser)
      .subscribe( 
        (userInfo: User) => {
          this.userInfo = userInfo;
        },
        (error) => {
          this.errors = error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      )
  }

  deleteUser() {
    this.usersService.deleteUser(this.routeUser)
      .subscribe( 
        () => {
          // # verificar se o user removido está em sessão e fazer sign-out
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
