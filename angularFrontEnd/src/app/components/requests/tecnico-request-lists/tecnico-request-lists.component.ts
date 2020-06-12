import { Component, OnInit } from '@angular/core';

import { RequestsService } from '../../../services/requests.service';
import { UpdateRequestsService } from '../../../services/update-requests.service';
import { SessionService } from '../../../services/session.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { Request } from '../../../models/request'

@Component({
  selector: 'app-tecnico-request-lists',
  templateUrl: './tecnico-request-lists.component.html',
  styleUrls: ['./tecnico-request-lists.component.css']
})
export class TecnicoRequestListsComponent implements OnInit {
  requests: Request[];
  sessionUser: any;
  currentUrlPath: String;

  errors: String;

  constructor(public requestsService: RequestsService, public updateRequestsService: UpdateRequestsService, 
    public sessionService: SessionService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sessionUser = this.sessionService.sessionUserValue;

    this.route.url.subscribe( (urlSegments: UrlSegment[]) => {
      this.currentUrlPath = urlSegments[0].path;
    })

    if (this.currentUrlPath === 'open-requests') {
      this.requestsService.getOpenRequests()
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
    } else if (this.currentUrlPath === 'request-list') {
      this.requestsService.getTecnicoRequests(this.sessionUser.cc)
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

  updateResponsavel(reqID: String) {
    this.updateRequestsService.updateTecnicoResponsavel(reqID, this.sessionUser.cc)
      .subscribe(
        () => {
          alert('Pedido atualizado com sucesso')
          this.router.navigate(['/dashboard/request-list'])
        },
        (error) => {
          this.errors = error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      )
  }
}
