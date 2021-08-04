import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { OrdersService } from '../orders.service';
import { Item } from 'src/app/item/item.model';
import { OrderView } from './orderview.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  item_list:Item[]=[];

  isLoading:boolean= false;

  orderid:string;

  public ORDER_DATA: OrderView[]=[];

  displayedColumns: string[] = ['ItemName', 'Quantity'];
  dataSource:any;

  constructor(public routes: ActivatedRoute,
              private authservice:AuthService,
              private orderservice:OrdersService) { }

  ngOnInit() {
    console.log('Hello');
    this.routes.paramMap.subscribe((parammap: ParamMap) => {
      if (parammap.has('orderid')) {
        this.orderid = parammap.get('orderid');
        console.log(this.orderid);
        this.orderservice.getSingleOrderData(this.orderid)
                         .subscribe((resultd)=>{
                          console.log(resultd);
                         // this.item_list = resultd.odata;
                          resultd.odata.forEach(item=>{
                            let neworderdata = {

                              ItemName: item.inputItemId.inputItemName,
                              Quantity: item.inputQuantity,

                            } ;
                            this.ORDER_DATA.push(neworderdata);

                          })
                          this.dataSource =this.ORDER_DATA;
                         })
      } else {
        this.ORDER_DATA = [];
        this.isLoading = false;

      }
    })

  }

  ServeOrder() {
    this.orderservice.serveOrder(this.orderid);
  }

}
