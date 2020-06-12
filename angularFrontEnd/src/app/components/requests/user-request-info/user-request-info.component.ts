import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, } from '@angular/router';

import { RequestsService } from '../../../services/requests.service';
import { Request } from '../../../models/request'

@Component({
  selector: 'app-user-request-info',
  templateUrl: './user-request-info.component.html',
  styleUrls: ['./user-request-info.component.css']
})
export class UserRequestInfoComponent implements OnInit {
  requestInfo: Request;
  sessionUser: any;
  routeUser: String;

  errors: String;

  constructor(public requestsService: RequestsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeUser = this.route.snapshot.params['cc'];
  }

  updateInfo(event) {
    this.requestInfo = event;
  }

}
