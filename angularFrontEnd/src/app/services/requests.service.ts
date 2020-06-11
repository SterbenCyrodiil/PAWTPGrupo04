import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

import { Request } from '../models/request'

const API_ENDPOINT = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  createRequest(request: any): Observable<any> {
    return this.http.post(
      `${ API_ENDPOINT }/requests/`, request, httpOptions
    )
  }
}
