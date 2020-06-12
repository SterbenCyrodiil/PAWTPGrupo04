import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

import { User } from '../models/user'

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
export class UsersService {

  constructor(private http: HttpClient) { }

  signUp(userData: any): Observable<any> {
    return this.http.post(
      `${ API_ENDPOINT }/users/`, userData, httpOptions
    )
  }

  signUpTecnico(userData: any): Observable<any> {
    return this.http.post(
      `${ API_ENDPOINT }/users/tecnico`, userData, httpOptions
    )
  }

  updateUser(userID: String, user: any): Observable<any> {
    return this.http.put(
      `${ API_ENDPOINT }/users/${ userID }`, user, httpOptions
    )
  }

  updateUserRole(userID: String, roleValue: String): Observable<any> {
    return this.http.put(
      `${ API_ENDPOINT }/users/role/${ userID }`, { role: roleValue }, httpOptions
    )
  }

  deleteUser(userID: String): Observable<any> {
    return this.http.delete(
      `${ API_ENDPOINT }/users/${ userID }`, httpOptions
    )
  }

  getUserInfo(userCC: String): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/users/CC/${ userCC }`, httpOptions
    )
  }

  getAllUtentes(): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/users/utentes/all`, httpOptions
    )
  }

  getAllTecnicos(): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/users/tecnicos/all`, httpOptions
    )
  }

  getAllUsers(): Observable<any> {
    return this.http.get(
      `${ API_ENDPOINT }/users/`, httpOptions
    )
  }
}
