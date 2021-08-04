import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartElement } from './cart-list/cart-element.model';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  addToCart(itemid:string,qty_data:number,unitprice:number) {
    const cartdata:any = {
      itemid : itemid,
      qty_data : qty_data,
      unitprice : unitprice
    }
    return this.http.post<{message: string}>(environment.apiUrl+'/api/carts', cartdata);

  }

  getCompleteCart() {
    return this.http.get<{message: string,exists:boolean,clist:any}>(environment.apiUrl+'/api/carts');
  }

  delete_element_cart(itemid:string) {
    return this.http.delete<{message: string}>(environment.apiUrl+'/api/carts/'+itemid);
  }

  delete_cart() {
    return this.http.delete<{message: string}>(environment.apiUrl+'/api/carts');
  }

  checkout(amount:string,formdata:any) {
    const checkout_data:any ={
      'inputAccount': formdata.inputAccount,
      'inputBank': formdata.inputBank,
      'inputCardType': formdata.inputCardType,
      'inputCardNo': formdata.inputCardNo,
      'inputCardCvv':formdata.inputCardCvv,
      'inputTotalAmount':amount
    }
    return this.http.post<{message: string}>(environment.apiUrl+'/api/carts/checkout',checkout_data);
  }

}
