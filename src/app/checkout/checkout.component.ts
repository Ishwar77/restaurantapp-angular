import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private fb:FormBuilder,
              private cartservice:CartService,
              private routes:ActivatedRoute,
              private route:Router,
              private authservice:AuthService) { }

  myform:FormGroup;

  isAutenticated:boolean=false;
  user_id:string;
  total_cost:string;

  ngOnInit() {
    this.routes.paramMap.subscribe((parammap)=>{
      if (parammap.has('amount')) {
        this.total_cost = parammap.get('amount');
      }
    })
    this.user_id =this.authservice.getUserId();
    this.myform = this.fb.group({
      'inputAccount': this.fb.control('',[Validators.required,Validators.minLength(3)]),
      'inputBank': this.fb.control(null, {validators: [Validators.required]}),
      'inputCardType': this.fb.control(null, {validators: [Validators.required]}),
      'inputCardNo': this.fb.control(null, {validators: [Validators.required]}),
      'inputCardCvv': this.fb.control(null, {validators: [Validators.required]}),
    });

  }

  onFormSubmit() {
    console.log('CHECKOUT');
   this.cartservice.checkout(this.total_cost,this.myform.value)
                    .subscribe((result)=>{
                       this.route.navigate(['/orderwait']);
                    })

  }

}
