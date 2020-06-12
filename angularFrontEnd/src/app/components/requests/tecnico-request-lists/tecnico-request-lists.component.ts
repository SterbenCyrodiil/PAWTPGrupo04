import { Component, OnInit } from '@angular/core';

import { RequestsService } from '../../../services/requests.service';
import { UpdateRequestsService } from '../../../services/update-requests.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { Request } from '../../../models/request'

@Component({
  selector: 'app-tecnico-request-lists',
  templateUrl: './tecnico-request-lists.component.html',
  styleUrls: ['./tecnico-request-lists.component.css']
})
export class TecnicoRequestListsComponent implements OnInit {
  requests: Request[];
  tecnicoCC: String;
  currentUrlPath: String;

  errors: String;

  constructor(public requestsService: RequestsService, public updateRequestsService: UpdateRequestsService, 
    public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tecnicoCC = this.route.snapshot.queryParams['tecnico'] || null;
    this.currentUrlPath = this.route.snapshot.url[0].path;

    if (this.currentUrlPath === 'open-requests') {
      this.requestsService.getOpenRequests()
      .subscribe( 
        (requests: Request[]) => {
          this.requests = requests;
        },
        (error) => {
          error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      )
    } else if (this.currentUrlPath === 'request-list') {
      this.requestsService.getTecnicoRequests(this.tecnicoCC)
      .subscribe( 
        (requests: Request[]) => {
          this.requests = requests;
        },
        (error) => {
          error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      )
    }
  }

  updateResponsavel(reqID: String) {
    this.updateRequestsService.updateTecnicoResponsavel(reqID, this.tecnicoCC)
      .subscribe(
        () => {
          alert('Pedido atualizado com sucesso')
          this.router.navigate(['/dashboard/request-list'], { queryParams: { tecnico: this.tecnicoCC }})
        },
        (error) => {
          error.error.message
            ? `${ error.status }: ${ error.error.message }`
            : `${ error.status }: ${ error.error }`
        }
      )
  }
}
