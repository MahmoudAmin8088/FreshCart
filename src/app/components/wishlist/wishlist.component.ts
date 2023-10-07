import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
declare let $:any
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishList:any;
  removeLoading: boolean = false;
  constructor(private _Wish:WishlistService){}
  ngOnInit(): void {
   this.getUserWishList();
  }

  getUserWishList(){
    this._Wish.getUserWishlist().subscribe({
      next:(response)=>{
        this.wishList= response.data
        $(".loading").fadeOut(1000);
        console.log(response.data);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  removeFromWishList(id: string){
    $(".loading").fadeIn(1000);
    this._Wish.removeProductfromWishlist(id).subscribe({
      next:(response)=>{
      this.getUserWishList();
        console.log(response.data);
        $(".loading").fadeOut(1000);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
