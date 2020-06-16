import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  intercept( 
    req: HttpRequest<any>, 
    next: HttpHandler 
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("auth-token")
    // # Adicionar token de autenticação ao Header de cada pedido
    let modified = req;
    if (token) {
      modified = req.clone({ setHeaders: { "auth-token": `Bearer ${ token }` } });
    }
    return next.handle(modified);
  }
}