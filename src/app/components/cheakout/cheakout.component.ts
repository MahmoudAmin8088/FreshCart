import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
declare let $:any;


@Component({
  selector: 'app-cheakout',
  templateUrl: './cheakout.component.html',
  styleUrls: ['./cheakout.component.css']
})
export class CheakoutComponent {
  cartId:any;
  isLoading:boolean=false;
  constructor(private _cartService:CartService,private _ActivatedRoute:ActivatedRoute,private _Router:Router){
    _ActivatedRoute.paramMap.subscribe((params)=>{
      this.cartId=params.get('id');
    })
  }

  shippingAddress:FormGroup= new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)
  });
  navigateToPayment(url:string){
    window.location.href = url;
  }
  // "6510eb585ad13a3b0d2ff796"
  checkOutVisa(shippingAddress:FormGroup){
    this.isLoading=true
    this._cartService.onlinePayment(shippingAddress.value,this.cartId).subscribe({
      next:(response)=>{
        this.isLoading=false
        this.navigateToPayment(response.session.url)
      },
      error:(err)=>{
        this.isLoading=false
        console.log(err)
      }
    })
    
    
  }
  checkOutCash(shippingAddress:FormGroup){
    this.isLoading=true
    this._cartService.cashPayment(shippingAddress.value,this.cartId).subscribe({
      next:(response)=>{
        this.isLoading=false;
        if(response.status == 'success'){
          this._Router.navigate(['/home']);
          this._cartService.numberOfCartItem.next(0);
        }
      },
      error:(err)=>{
        this.isLoading=false
        console.log(err)
      }
    })    
  }


  getPaymentMethod(){
    let x =  $("input[type='radio'][name='method']:checked").val();
    if(x=='Cash'){
      this.checkOutCash(this.shippingAddress.value)
    }
    else{
      this.checkOutVisa(this.shippingAddress.value)
    }
    }
}
