import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
declare let $:any
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userorders:any;
  userId:string=''; 
  constructor(private _cartService:CartService ,private _auth:AuthService , private _title:Title){
    _title.setTitle('Orders')
  }
  ngOnInit(): void {
    this.getUserId();
    this.getUserOrder();
  }
  getUserId(){
    this.userId = this._auth.userData.value.id;    
  }
  getUserOrder(){
    this._cartService.getUserOrders(this.userId).subscribe({
      next:(response)=>{
        this.userorders=response
        console.log(this.userorders);
        $(".loading").fadeOut(1000);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



}
