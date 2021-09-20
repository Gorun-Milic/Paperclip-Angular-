import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem("jwt-token");
    if(token){
      const authHeader=request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
      })
      request = authHeader;
    }
    return next.handle(request);
  }
}
