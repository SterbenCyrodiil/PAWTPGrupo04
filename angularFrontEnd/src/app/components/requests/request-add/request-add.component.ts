import { Component, OnInit, Input } from '@angular/core';

import { RequestsService } from '../../../services/requests.service';
import { SessionService } from '../../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.css']
})
export class RequestAddComponent implements OnInit {
  sessionUser: any;
  request: any = {
    id: '',
    CCutente: '',
    trabalhadorDeRisco: false,
    grupoDeRisco: false,
    encaminhado_saude24: false
  };

  errors: String;

  constructor(public requestsService: RequestsService, public sessionService: SessionService,
    public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sessionService.sessionUser().subscribe((user) => {
      this.sessionUser = user;
      if (!this.sessionUser) { // # redirecionamento para login se não existe um utilizador em sessão
        const options = this.sessionService.expired ? { queryParams: { expired: 'true' } } : undefined
        this.router.navigate(['/sign-in'], options);
      }
    })
  }

  createRequestEvent(event): void {
    event.preventDefault();
    this.request.CCutente = this.sessionUser.cc; 
    this.errors = ''
    this.requestsService.createRequest(this.request)
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
