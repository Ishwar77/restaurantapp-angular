import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public routes: ActivatedRoute,
    private authservice:AuthService) { }

isLoading = false;

tableId:string ='1234';


myform: FormGroup;

ngOnInit() {
  this.myform = this.fb.group({
  'inputUsername' : this.fb.control('',[Validators.required]),
  'inputPassword' : this.fb.control('',[Validators.required]),
  });

}

onLogin() {

  if (this.myform.invalid) {
    return;
  }
  console.log(this.myform.value);
   this.authservice.userAdminLogin(this.myform.value.inputUsername, this.myform.value.inputPassword);
  }

}
