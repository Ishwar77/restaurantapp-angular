import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from '../item.model';
import { Category } from 'src/app/category/category.model';
import { CategoryService } from 'src/app/category/category.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import * as $ from 'jquery';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  isLoading:boolean = false;

  Userid:string;

  item_list:Item[]=[];

  catid:string;
  isAuthenticated: boolean = false;
  table_id:string='1234';

  catergory_details:Category;
  AuthSubcription: Subscription;
  Auth_user_role:number = -1;

  constructor(private itemservice:ItemService,
              private catservice:CategoryService,
              private cartservice:CartService,
              private _flashMessagesService: FlashMessagesService,
              private authservice:AuthService,
              public routes: ActivatedRoute) { }

  ngOnInit() {
    this.isAuthenticated = this.authservice.getAuthStatus();
    this.AuthSubcription = this.authservice.getAuthStatusListener()
                                            .subscribe((authdata)=>{
                                              this.isAuthenticated = authdata.authstate;
                                              this.Auth_user_role = authdata.authrole;
                                            });
    this.isLoading = true;
    this.routes.paramMap.subscribe((parammap: ParamMap) => {
      if (parammap.has('catId')) {

        this.catid = parammap.get('catId');
        console.log(this.catid);
        this.catservice.getSingleCategory(this.catid)
                                                .subscribe((catdata)=>{
                                                  this.catergory_details=catdata.cdata;
                                                  this.itemservice.getCatItem(this.catid)
                                                                  .subscribe((itemdata)=>{

                                                                    this.isLoading = false;
                                                                    this.item_list = itemdata.ilist;
                                                                    console.log(this.item_list);
                                                                  });
                                                });

      }
    });
  }

  addToCart(itemid:string) {

   this.Userid = this.authservice.getUserId();
   console.log(this.Userid);
   var qty_data = parseInt($("."+itemid).val());
   const cart_item_data = this.item_list.find(aitem=>aitem._id===itemid);
   console.log(cart_item_data);
   this.cartservice.addToCart(itemid,qty_data,cart_item_data.inputUnitPrice)
                   .subscribe((result)=>{
                    this._flashMessagesService.show('Added To Cart', { cssClass: 'alert-success', timeout: 3000 });
                   })

  }

}
