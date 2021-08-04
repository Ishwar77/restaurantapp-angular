import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  myform: FormGroup;


  constructor(private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this.myform = this.fb.group({
      'inputTable' : this.fb.control('',[Validators.required]),
      
    });
  }
  
  onLogin(){
    if(this.myform.invalid) {
      alert('Please Provide Table ID');
      return;
    }
    this.router.navigate(['login',this.myform.value.inputTable])
  }

  onSignUp(){
    if(this.myform.invalid) {
      alert('Please Provide Table ID');
      return;
    }
    this.router.navigate(['register',this.myform.value.inputTable])
  }
}
