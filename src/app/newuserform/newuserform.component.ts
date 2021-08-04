import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-newuserform',
  templateUrl: './newuserform.component.html',
  styleUrls: ['./newuserform.component.css']
})
export class NewuserformComponent implements OnInit {

  myform: FormGroup;

  isLoading:boolean=false;

  constructor(private fb: FormBuilder,
              public routes: ActivatedRoute,
              private router: Router,
              private _flashMessagesService: FlashMessagesService,
              private aservice:AuthService) { }

  ngOnInit() {
    this.myform = this.fb.group({
      'inputFname' : this.fb.control('',[Validators.required]),
      'inputLname' : this.fb.control('',[Validators.required]),
      'inputContact' : this.fb.control('',[Validators.required]),
      'inputUsername' : this.fb.control('',[Validators.required,Validators.email]),
      'inputPassword' : this.fb.control('',[Validators.required]),
      'inputRole' : this.fb.control('',[Validators.required]),
    });
  }

  onSubmit() {
    if(this.myform.invalid) {
      return;
    }
    this.aservice.addnewuser(this.myform.value)
    .subscribe((result) => {
        this._flashMessagesService.show('User Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
        this.myform.reset();
     });
  }

}
