import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public routes: ActivatedRoute,
              private authservice:AuthService) { }

  isLoading = false;

  tableId:string ='1234';


  myform: FormGroup;

  ngOnInit() {
    this.routes.paramMap.subscribe((parammap: ParamMap) => {
      if (parammap.has('tabelid')) {
        this.tableId = parammap.get('tabelid');
      }
    });
    this.myform = this.fb.group({
      'inputUsername' : this.fb.control('',[Validators.required]),
      'inputPassword' : this.fb.control('hello',[Validators.required]),
    });

  }

  onLogin() {

    if (this.myform.invalid) {
      return;
    }
    console.log(this.myform.value);
    this.authservice.userlogin(this.myform.value.inputUsername, this.myform.value.inputPassword,this.tableId);
  }

}
