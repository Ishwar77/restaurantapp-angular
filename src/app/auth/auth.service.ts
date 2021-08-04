import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpc: HttpClient,
              private _flashMessagesService: FlashMessagesService,
              private router: Router) { }

  private token;
  private table_id = '1234';
  private user_role = -1;
  private isAuthenticated = false;
  private userid;
  private tokenexptimer: any;
  public AuthStatusEmitter = new Subject<{authstate:boolean,authrole:number}>();

  addnewuser(formdata: any) {

    return this.httpc.post<{message: string,userid: string}>(environment.apiUrl+'/api/users', formdata);


  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getAuthRole() {
    return this.user_role;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userid;
  }

  getAuthStatusListener() {
    return this.AuthStatusEmitter.asObservable();
  }

  userlogin(EmailInput:string,PasswordInput:string,tableId:string) {


    const authdata = {
      username : EmailInput,
      password : PasswordInput,
      tableId : tableId
    };
    this.table_id = tableId;
    this.httpc.post<{token: string, expiresIn: number, userid: string, user_role: number}>(environment.apiUrl+'/api/users/login', authdata)
    .subscribe((result) => {
               console.log(result);
               this._flashMessagesService.show('User Login Successfull', { cssClass: 'alert-success', timeout: 5000 });
               if (result) {
                 this.token = result.token;
                 this.user_role = result.user_role;
                 this.userid = result.userid;
                 const timervalue = result.expiresIn;

                 this.setAuthotimer(timervalue);
                 const current_date = new Date();
                 const exp_date = new Date(current_date.getTime() + timervalue * 1000);

                 this.saveAuthDataLocal(this.token , exp_date, this.userid,this.user_role);
                 this.AuthStatusEmitter.next({
                                             authstate:true,
                                             authrole:this.user_role});
                 this.router.navigate(['/']);
               }
    },
    error=>{
     this.AuthStatusEmitter.next({
      authstate:false,
      authrole:-1});
    });
  }

  userAdminLogin(EmailInput:string,PasswordInput:string) {


    const authdata = {
      username : EmailInput,
      password : PasswordInput,
    };

    this.httpc.post<{token: string, expiresIn: number, userid: string, user_role: number}>(environment.apiUrl+'/api/users/alogin', authdata)
    .subscribe((result) => {
               console.log(result);
               this._flashMessagesService.show('User Login Successfull', { cssClass: 'alert-success', timeout: 5000 });
               if (result) {
                 this.token = result.token;
                 this.user_role = result.user_role;
                 this.userid = result.userid;
                 const timervalue = result.expiresIn;

                 this.setAuthotimer(timervalue);
                 const current_date = new Date();
                 const exp_date = new Date(current_date.getTime() + timervalue * 1000);

                 this.saveAuthDataLocal(this.token , exp_date, this.userid,this.user_role);
                 this.AuthStatusEmitter.next({
                                             authstate:true,
                                             authrole:this.user_role});
                 this.router.navigate(['/']);
               }
    },
    error=>{
     this.AuthStatusEmitter.next({
      authstate:false,
      authrole:-1});
    });
  }


  private saveAuthDataLocal(token: string, expiresInDate: Date, userid: string,userrole:number) {
    localStorage.setItem('token', token);
    localStorage.setItem('userid', userid);
    localStorage.setItem('userrole', userrole.toString());
    localStorage.setItem('expirationDate', expiresInDate.toISOString());
  }

  private setAuthotimer(duration: number) {
    setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    this.userid = null;
    this.AuthStatusEmitter.next({
                                authstate:false,
                                 authrole:-1
                                });
    clearTimeout(this.tokenexptimer);
    this.clearAuthData();
    this.router.navigate(['/login/'+this.table_id]);
 }

 adminlogout() {
  this.isAuthenticated = false;
  this.token = null;
  this.userid = null;
  this.AuthStatusEmitter.next({
                              authstate:false,
                               authrole:-1
                              });
  clearTimeout(this.tokenexptimer);
  this.clearAuthData();
  this.router.navigate(['/admin/login']);
 }

 private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('userid');
  localStorage.removeItem('userrole');
  localStorage.removeItem('expirationDate');
}


AutoAuthUser() {
  const AuthLocalData = this.getAuthData();
  const now = new Date();

  if (AuthLocalData) {
    const expiresIn = AuthLocalData.expIntime.getTime() - now.getTime();
    if (expiresIn > 0 ) {
      this.token = AuthLocalData.token;
      this.isAuthenticated = true;
      this.userid = AuthLocalData.userid;
      this.user_role = +AuthLocalData.userrole;
      this.setAuthotimer(expiresIn / 1000);
      this.AuthStatusEmitter.next({
                                  authstate:true,
                                  authrole:this.user_role
                                  });
    }
  }

}

private getAuthData() {
  const token = localStorage.getItem('token');
  const expIntime = localStorage.getItem('expirationDate');
  const userid = localStorage.getItem('userid');
  const userrole = localStorage.getItem('userrole');
  if (!token || !expIntime) {
    return;
  }
  return {
    token: token,
    expIntime : new Date(expIntime),
    userid : userid,
    userrole : userrole
  };
}

}
