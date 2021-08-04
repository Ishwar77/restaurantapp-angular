import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../orders.service";
import { AuthService } from "src/app/auth/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { OrderElement } from './orders.model';

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"]
})
export class OrderListComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private orderservice: OrdersService
  ) {}

  isAutenticated: boolean = false;

  isLoading: boolean = false;

  total: number = 0;

  public ORDER_DATA: OrderElement[]=[];

  displayedColumns: string[] = ['TableID', 'TotalPrice', 'Actions'];
  dataSource:any;

  ngOnInit() {
    this.isLoading =true;
    this.updateMyList();

  }

  updateMyList() {
    this.ORDER_DATA=[];
    this.orderservice.getCompleteList()
                     .subscribe((result)=>{
                       console.log('Data is');
                       console.log(result);
                            if(result) {
                              //this.CART_DATA = result.clist;
                              result.olist.forEach((list)=>{
                               console.log('hello');
                                let newcartdata = {
                                  TableID: list.inputTableId,
                                  TotalPrice: list.inputTotalCost,
                                  inputItemId : list._id,
                                  Actions: '<a href="http://google.com">CLICK</a>'
                                } ;
                                this.ORDER_DATA.push(newcartdata);

                              });
                              console.log('CART DATA IS');
                              console.log(this.ORDER_DATA);
                              console.log('TOTAL IS');
                              console.log(this.total);
                              this.dataSource =this.ORDER_DATA;
                              this.isLoading = false;
                            } else {
                              this.ORDER_DATA = [];
                              this.isLoading = false;
                            }

                     });
  }


  view_order(orderid: string) {

  }
}


