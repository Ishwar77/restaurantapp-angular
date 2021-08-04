import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(private authservice: AuthService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler) {
     const authToken = this.authservice.getToken();
     const authReq = req.clone({
       headers : req.headers.set('Authorization', 'Bearer ' + authToken)
     });
     //console.log(authReq);
     return next.handle(authReq);
   }
}
