import { Component, OnInit, Input } from '@angular/core';

import { RequestsService } from '../../../services/requests.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.css']
})
export class RequestAddComponent implements OnInit {
  userCC: String;
  request: any = {
    id: '',
    CCutente: '',
    trabalhadorDeRisco: false,
    grupoDeRisco: false,
    encaminhado_saude24: false
  };

  errors: String;

  constructor(public requestsService: RequestsService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() { 
    this.userCC = this.route.snapshot.params['cc'];
  }

  createRequestEvent(event): void {
    event.preventDefault();
    this.request.CCutente = this.userCC; 
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
