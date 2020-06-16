import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class SessionEndInterceptor implements HttpInterceptor {
  constructor(public sessionService: SessionService, public router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // 401 handled in auth.interceptor
          this.sessionService.clearSession();
        }
        return throwError(error);
      })
    );
  }
}