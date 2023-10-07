import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr'
import { Products, proudct } from 'src/app/interface/product';
import { WishlistService } from 'src/app/services/wishlist.service';

declare let $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  term: string = '';
  productId:string=''
  isLoading: boolean = false;
  constructor(private _ToastrService: ToastrService,private _wish:WishlistService, private titleService: Title, private _ProductsService: ProductsService, private _CartService: CartService) {
    titleService.setTitle('Products')

  }
  ngOnInit(): void {
    this.getProducts();
    this.pagenation();
  }

  getProductId(e: any) {
    this.productId = $(e.target).next().text();
    $(e.target).addClass('text-danger');
    this.addToWish();
  }

addToWish(){
  $(".loading").fadeIn(500);
  this._wish.addProductToWishlist(this.productId).subscribe({
    next:(response)=>{
      console.log(response);
      $(".loading").fadeOut(1000);
    },
    error:(err)=>{
      console.log(err);  
    }
  })
}


  pagenation() {
    $(".pagenum").click((e: any) => {
      let pagenum = $(e.target).text();
      this.getProducts(pagenum)
    });
  }

  addToCart(id: string) {
    $(".loading").fadeIn(500);
    this.isLoading = true;
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
      $(".loading").fadeOut(1000);
        this.isLoading = false;
        this._CartService.numberOfCartItem.next(response.numOfCartItems);
        this._ToastrService.success("Item Added", "success");
      },
      error: (err) => {
      $(".loading").fadeOut(1000);
        console.log(err);

      }
    })
  }
  getProducts(page: string = '1') {
    this._ProductsService.getProduct(page).subscribe({
      next: (response: Products) => {
        console.log(response.data);
        
        this.products = response.data;

        $(".loading").fadeOut(1000);
      },
    })
  }

}
