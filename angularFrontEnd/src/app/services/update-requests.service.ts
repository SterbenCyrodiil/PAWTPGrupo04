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
export class UpdateRequestsService {

  constructor(private http: HttpClient) { }

  updateTecnicoResponsavel(requestID: String, tecnicoCC: String): Observable<any> {
    return this.http.put(
      `${ API_ENDPOINT }/requests/update/tecnico/${ requestID }`, 
      { 
        tecnico: tecnicoCC
      } , httpOptions
    )
  }

  updateFirstTestDate(requestID: String, testDateValue: Date): Observable<any> {
    return this.http.put(
      `${ API_ENDPOINT }/requests/update/firstDate/${ requestID }`, 
      { 
        testDate: testDateValue.toUTCString() 
      } , httpOptions
    )
  }

  updateFirstTestResult(requestID: String, testResultValue: Boolean, secondTestDateValue?: Date): Observable<any> {
    return this.http.put(
      `${ API_ENDPOINT }/requests/update/firstTest/${ requestID }`, 
      { 
        testResult: testResultValue,
        secondTestDate: secondTestDateValue.toUTCString() 
      } , httpOptions
    )
  }

  updateSecondTestDate(requestID: String, testDateValue: Date): Observable<any> {
    return this.http.put(
      `${ API_ENDPOINT }/requests/update/secondDate/${ requestID }`, 
      { 
        testDate: testDateValue.toUTCString() 
      } , httpOptions
    )
  }

  updateSecondTestResult(requestID: String, testResultValue: Boolean): Observable<any> {
    return this.http.put(
      `${ API_ENDPOINT }/requests/update/secondTest/${ requestID }`, 
      { 
        testResult: testResultValue
      } , httpOptions
    )
  }

  // # Upload results file
  
}
