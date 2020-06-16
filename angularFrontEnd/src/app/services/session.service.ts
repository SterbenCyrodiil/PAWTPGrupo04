import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable, BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';
import { share } from 'rxjs/operators'

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
export class SessionService {

  // # Controlo de sessão do utilizador
  expired: Boolean;

  private sessionuser: BehaviorSubject<any>;

  constructor(private http: HttpClient) { 
    // this.http.get(
    //   `${API_ENDPOINT}/session-user`, httpOptions).subscribe( (user) => {
    //     this.sessionuser = new BehaviorSubject<any>(user);
    //   });
    this.sessionuser = new BehaviorSubject<any>(
      localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    )
  }

  public get sessionUserValue(): any {
    return this.sessionuser.value;
  }

  signIn(CC: String, password: String): Observable<any> {
    const request = this.http.post(
      `${API_ENDPOINT}/sign-in`, { CC, password }, httpOptions)
      // # share() faz com que o request '/sign-in' não se repita num subscribe a esta função
      .pipe(share());

    // # Guardar o token no serviço, envitando faze-lo no component
    request.subscribe( (response: any) => {
      console.log(response);
      const { user, token } = response;
      this.sessionuser.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("auth-token", token);
    });

    return request;
  }

  sessionUser(): Observable<any> {
    return this.sessionuser;
  }

  signOut() {
    this.expired = false;
    this.sessionuser.next(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth-token");
    // sinalizar o servidor do logout
    this.http.post(`${API_ENDPOINT}/sign-out`, undefined, httpOptions).subscribe();
  }

  clearSession() {
    this.expired = true;
    this.sessionuser.next(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth-token");
  }

}
