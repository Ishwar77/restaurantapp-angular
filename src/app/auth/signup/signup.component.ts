import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public routes: ActivatedRoute,
              private router: Router,
              private _flashMessagesService: FlashMessagesService,
              private aservice:AuthService) { }

  myform: FormGroup;

  tableId:string ='1234';

  isLoading:boolean=false;

  ngOnInit() {
    this.routes.paramMap.subscribe((parammap: ParamMap) => {
      if (parammap.has('tabelid')) {
        this.tableId = parammap.get('tabelid');
      }
    });
    this.myform = this.fb.group({
      'inputFname' : this.fb.control('',[Validators.required]),
      'inputLname' : this.fb.control('',[Validators.required]),
      'inputContact' : this.fb.control('',[Validators.required]),
      'inputUsername' : this.fb.control('',[Validators.required,Validators.email]),
      'inputPassword' : this.fb.control('',[Validators.required]),
    });

  }

  onSubmit() {
     if(this.myform.invalid) {
       return;
     }
     this.aservice.addnewuser(this.myform.value)
     .subscribe((result) => {
         this._flashMessagesService.show('User Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
         this.router.navigate(['/login/'+this.tableId]);
      });
  }

}
