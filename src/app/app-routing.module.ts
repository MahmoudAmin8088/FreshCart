import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './auth.guard';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CheakoutComponent } from './components/cheakout/cheakout.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [

  
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home',canActivate:[authGuard] ,component:HomeComponent},
  {path:'categories', canActivate:[authGuard] ,component:CategoriesComponent},
  {path:'cart', canActivate:[authGuard] ,component:CartComponent},
  {path:'productdetails/:id', canActivate:[authGuard] ,component:ProductdetailsComponent},
  {path:'products', canActivate:[authGuard] ,component:ProductsComponent},
  {path:'checkout/:id', canActivate:[authGuard] ,component:CheakoutComponent},
  {path:'brands', canActivate:[authGuard] ,component:BrandsComponent},
  {path:'wishlist', canActivate:[authGuard] ,component:WishlistComponent},
  {path:'orders', canActivate:[authGuard] ,component:OrdersComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgetpassword',component:ForgetPasswordComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:'settings',loadChildren:(()=>import('./settings/settings.module').then((m)=>m.SettingsModule))},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
