import { Component, OnInit } from '@angular/core';
import { CartElement} from './cart-element.model';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from '../cart.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  constructor(private authservice:AuthService,
              private _flashMessagesService: FlashMessagesService,
              private cartservice:CartService) { }

  isAutenticated:boolean=false;

  isLoading:boolean= false;

  total:number=0;


  public CART_DATA: CartElement[]=[];

  displayedColumns: string[] = ['ItemName', 'Quantity', 'Total', 'Actions'];
  dataSource:any;


  ngOnInit() {
    this.isLoading =true;
    this.updateMyCart();

  }

  updateMyCart() {
    this.CART_DATA=[];
    this.total=0;
    this.cartservice.getCompleteCart()
                     .subscribe((result)=>{
                       console.log('Data is');
                       console.log(result);
                            if(result.exists) {
                              //this.CART_DATA = result.clist;
                              result.clist.forEach((list)=>{
                                this.total = this.total+(list.inputQuantity*list.inputPrice);
                                let newcartdata = {
                                  ItemName: list.inputItemId.inputItemName,
                                  Quantity: list.inputQuantity,
                                  inputItemId : list.inputItemId._id,
                                  Total: list.inputPrice,
                                  Actions: '<a href="http://google.com">CLICK</a>'
                                } ;
                                this.CART_DATA.push(newcartdata);

                              });
                              console.log('CART DATA IS');
                              console.log(this.CART_DATA);
                              console.log('TOTAL IS');
                              console.log(this.total);
                              this.dataSource =this.CART_DATA;
                              this.isLoading = false;
                            } else {
                              this.CART_DATA = null;
                              this.isLoading = false;
                            }

                     });
  }


  delete_cart(itemid:string) {
   this.cartservice.delete_element_cart(itemid)
                   .subscribe((result)=>{
                    this._flashMessagesService.show('Item Deleted From Cart', { cssClass: 'alert-danger', timeout: 5000 });
                    this.updateMyCart();
                   })
  }

  clearCart() {
    this.cartservice.delete_cart()
                    .subscribe((result)=>{
                      this._flashMessagesService.show('Cart Cleared', { cssClass: 'alert-danger', timeout: 5000 });
                      this.updateMyCart();
                    })
  }






}
