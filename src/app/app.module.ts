import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppheaderComponent } from './appheader/appheader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatInputModule,
         MatCardModule,
         MatRadioModule,
         MatButtonModule,
         MatToolbarModule,
         MatIconModule,
         MatExpansionModule,
         MatProgressSpinnerModule,
         MatPaginatorModule,
         MatSelectModule,
         MatTableModule,
         MatListModule,
         MatGridListModule,
         MatMenuModule,
       //  MatDialogModule} from '@angular/material';
        MatDialogModule} from '@angular/material';
import { CategoryComponent } from './category/category-create/category.component';
import { ItemComponent } from './item/item-create/item.component';
import { FooterComponent } from './footer/footer.component';
import { ShowErrorsComponent } from './errors/show-errors/show-errors.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { OrderWaitComponent } from './order-wait/order-wait.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { NewuserformComponent } from './newuserform/newuserform.component';
import { OrderListComponent } from './user-orders/order-list/order-list.component';
import { OrderDetailsComponent } from './user-orders/order-details/order-details.component';
import { LocationStrategy,PathLocationStrategy } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    CategoryComponent,
    ItemComponent,
    FooterComponent,
    ShowErrorsComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    ItemListComponent,
    CartListComponent,
    CheckoutComponent,
    OrderWaitComponent,
    AdminLoginComponent,
    NewuserformComponent,
    OrderListComponent,
    OrderDetailsComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
               {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
               {provide: LocationStrategy, useClass: PathLocationStrategy}
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
