import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../services/session.service';
import { RequestsService } from '../../../services/requests.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Request } from '../../../models/request'

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {
  requests: Request[];
  sessionUser: any;
  routeUser: String;

  errors: String;

  constructor(public requestsService: RequestsService, public sessionService: SessionService, 
    public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeUser = this.route.snapshot.params['cc'];

    this.sessionUser = this.sessionService.sessionUserValue;

    this.requestsService.getUtenteRequests(this.routeUser)
      .subscribe( 
        (requests: Request[]) => {
          this.requests = requests;
        },
        (error) => {
          this.errors = error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      )
  } 

}
