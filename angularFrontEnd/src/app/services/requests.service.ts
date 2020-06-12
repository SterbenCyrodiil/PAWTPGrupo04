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

  getResultsFileDownloadRequest(requestID: String): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/download/${ requestID }`, {
          responseType: "blob",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/pdf"
          }
      }
    )
  }

  createRequest(request: any): Observable<any> {
    return this.http.post(
      `${ API_ENDPOINT }/requests/`, request, httpOptions
    )
  }

  deleteRequest(requestID: String): Observable<any> {
    return this.http.delete(
      `${ API_ENDPOINT }/requests/${ requestID }`, httpOptions
    )
  }

  getUtenteLastRequest(utenteCC: String): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/utente/${ utenteCC }/last`, httpOptions
    )
  }

  getUtenteRequests(utenteCC: String): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/utente/${ utenteCC }`, httpOptions
    )
  }

  getTecnicoRequests(tecnicoCC: String): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/tecnico/${ tecnicoCC }`, httpOptions
    )
  }

  getRequest(requestID: String): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/${ requestID }`, httpOptions
    )
  }

  getOpenRequests(): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/open`, httpOptions
    )
  }

  getInfectedRequests(tecnicoCC: String): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/positivos`, httpOptions
    )
  }

  getNotInfectedRequests(): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/negativos`, httpOptions
    )
  }

  getAllRequests(): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/requests/`, httpOptions
    )
  }
}
