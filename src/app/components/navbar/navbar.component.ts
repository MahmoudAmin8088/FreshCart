import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService:AuthService,private _CartService:CartService){

  }
  isLogedIn:boolean=false;
  cartNumber:number=0;
  ngOnInit(): void {
    this.subOnUserData();
    this.getCartNumber();
  }

  getCartNumber(){
    this._CartService.numberOfCartItem.subscribe({
      next:(value)=>{
        this.cartNumber = value;
      },
      error:(err)=>{
        console.log(err); 
      }
    })
  }

  subOnUserData(){
   this._AuthService.userData.subscribe({
    next:()=>{
      if(this._AuthService.userData.getValue() !== null){
        this.isLogedIn=true;
      }
      else{
        this.isLogedIn=false;
      }
    }

   })
  }

  logOut()
{
  this._AuthService.logOut();
}
}
