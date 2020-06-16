import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../../../services/requests.service';
import { SessionService } from '../../../services/session.service';

import { Request } from '../../../models/request'
import * as fileSaver from 'file-saver/';

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
    public router: Router, private route: ActivatedRoute) { 
  }

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
            // check test download
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
            // check test download
          },
          (error) => {
            this.errors = error.error.message
              ? `${ error.status }: ${ error.error.message }`
              : `${ error.status }: ${ error.error }`
          }
        )
    }
  }

  downloadResultsFile() {
    this.requestsService.getResultsFileDownloadRequest(this.requestInfo._id).subscribe(
      (request: any) => {
        fileSaver.saveAs(request, 'TestResults.pdf');
      },
      (error) => {
        this.errors = error.error.message
          ? `${ error.status }: ${ error.error.message }`
          : `${ error.status }: ${ error.error }`
      }
    );
  }

}
