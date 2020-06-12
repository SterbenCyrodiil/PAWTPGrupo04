import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../../../services/requests.service';
import { SessionService } from '../../../services/session.service';
import { Request } from '../../../models/request'

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.css']
})
export class RequestInfoComponent implements OnInit {
  requestInfo: Request;
  @Output() notify = new EventEmitter<Request>();

  routeRequest: String;
  sessionUser: any;

  errors: String;

  constructor(public requestsService: RequestsService, public sessionService: SessionService,
    public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeRequest = this.route.snapshot.params['reqId'] || null;

    this.sessionUser = this.sessionService.sessionUserValue;

    switch(this.sessionUser.role) {
      case 'UTENTE':
        this.requestsService.getUtenteLastRequest(this.sessionUser.cc)
        .subscribe( 
          (request) => {
            this.requestInfo = request;
            this.notify.emit(this.requestInfo);
          },
          (error) => {
            this.errors = error.error.message
              ? `${ error.status }: ${ error.error.message }`
              : `${ error.status }: ${ error.error }`
          }
        )
        break;
      default:
        this.requestsService.getRequest(this.routeRequest)
        .subscribe( 
          (request) => {
            this.requestInfo = request;
          },
          (error) => {
            this.errors = error.error.message
              ? `${ error.status }: ${ error.error.message }`
              : `${ error.status }: ${ error.error }`
          }
        )
    }
  }

}
