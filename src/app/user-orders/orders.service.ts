import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient,private router: Router) { }

  getCompleteList() {
    return this.http.get<{message: string,exists:boolean,olist:any}>(environment.apiUrl+'/api/orders');
  }

  getSingleOrderData(oid:string){
    return this.http.get<{message: string,odata:any}>(environment.apiUrl+'/api/orders/'+oid);
  }

  serveOrder(oid:string) {
    this.http.get<{message: string}>(environment.apiUrl+'/api/orders/serve/'+oid)
                                    .subscribe((data)=>{
                                      this.router.navigate(['/orderlist']);
                                    })
  }
}
