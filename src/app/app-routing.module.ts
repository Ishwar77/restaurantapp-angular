import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category-create/category.component';
import { ItemComponent } from './item/item-create/item.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderWaitComponent } from './order-wait/order-wait.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { NewuserformComponent } from './newuserform/newuserform.component';
import { OrderListComponent } from './user-orders/order-list/order-list.component';
import { OrderDetailsComponent } from './user-orders/order-details/order-details.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {path:'category',component:CategoryComponent},
  {path:'item',component:ItemComponent},
  {path:'login/:tabelid',component:LoginComponent},
  {path:'register/:tabelid',component:SignupComponent},
  {path:'',component:HomepageComponent},
  {path : 'catitems/:catId', component : ItemListComponent},
  {path : 'cartlist', component : CartListComponent},
  {path : 'checkout/:amount', component : CheckoutComponent},
  {path : 'orderwait', component : OrderWaitComponent},
  {path : 'orderlist', component : OrderListComponent},
  {path : 'orderdetails/:orderid', component : OrderDetailsComponent},
  {path : 'admin/login', component : AdminLoginComponent},
  {path : 'newuser', component : NewuserformComponent},
  {path : 'customerpage', component : UserPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
