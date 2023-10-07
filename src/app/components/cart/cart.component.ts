import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _titleService: Title, private _CartService: CartService, private _ToastrService: ToastrService) {
    _titleService.setTitle('Cart')
  }

  cartDetails: any;
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getUserCart();
    
  }

  getUserCart() {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        $(".loading").fadeOut(1000);
        console.log(response);
      },
      error: (err) =>{
        $(".loading").fadeOut(1000);
        console.log(err)}
      

    })
  }

  removeItem(id: string) {
    $(".loading").fadeIn(1000);
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        $(".loading").fadeOut(1000);
        this._CartService.numberOfCartItem.next(response.numOfCartItems)
        this._ToastrService.success("DeletedItem", "success");
        this.getUserCart();
        console.log(response);
        
      },
      error: (err) => {
        $(".loading").fadeOut(1000);
         console.log(err)
        }
    });
  }
  clearCart() {
    this.isLoading=true
    this._CartService.clearCart().subscribe({
      next: (response) => {
        this.isLoading=false
        this._CartService.numberOfCartItem.next(0);
        this._ToastrService.success("Cart Deleted", "success")
        this.cartDetails = response.data;
        console.log(response);
        
      },
      error: (err) => {
        this.isLoading=false
         console.log(err) 
        }
    });
  }
  updateQuantity(id: string, count: number) {
    this._CartService.updateQuantity(id, count).subscribe({
      next: (response) => {
        this.cartDetails = response.data
      },
    });
  } 
  }



