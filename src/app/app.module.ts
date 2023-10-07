import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { SearchPipe } from './search.pipe';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { CheakoutComponent } from './components/cheakout/cheakout.component';
import { AddheaderInterceptor } from './inteceptorr/addheader.interceptor';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    NavbarComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NotfoundComponent,
    RegisterComponent,
    ProductsComponent,
    ProductdetailsComponent,
    MainSliderComponent,
    SearchPipe,
    CheakoutComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    OrdersComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    CarouselModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [
  // {
  //   provide:HTTP_INTERCEPTORS,
  //   useClass:AddheaderInterceptor,
  //   multi:true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
