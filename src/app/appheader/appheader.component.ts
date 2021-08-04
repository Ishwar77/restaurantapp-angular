import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  constructor(private authservice:AuthService) { }


  isAuthenticated: boolean = false;
  Auth_user_role:number = -1;

  AuthSubcription: Subscription;

  ngOnInit() {
    this.isAuthenticated = this.authservice.getAuthStatus();
    this.Auth_user_role = this.authservice.getAuthRole();
    console.log(this.Auth_user_role);
     this.AuthSubcription = this.authservice.getAuthStatusListener()
                                            .subscribe((authdata)=>{
                                              console.log('inside appheader');
                                              console.log(authdata);
                                              this.isAuthenticated = authdata.authstate;
                                              this.Auth_user_role = authdata.authrole;
                                            });


  }

  Logout() {
    this.authservice.logout();
  }

  AdminLogout() {
    this.authservice.adminlogout();
  }

}
