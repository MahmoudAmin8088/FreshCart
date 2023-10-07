import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductsComponent } from '../products/products.component';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
declare let $:any

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  isLoading:boolean=false;

  constructor(private _ToastrService:ToastrService ,private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService
    ,private _CartService:CartService) { }
  productId: any;
  productDetails: any;

  ngOnInit(): void {
    this.getId();
    this.getDetails(this.productId);
  }

 
 addToCart(id:string){
  $(".loading").fadeIn(1000);
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      $(".loading").fadeOut(1000);
      this._CartService.numberOfCartItem.next(response.numOfCartItems)
      this._ToastrService.success("Item Added","success")
    },
    error:(err)=>{
      $(".loading").fadeOut(1000);
      console.log(err)}
    
    
  })
 }
  getDetails(id: string) {
    this._ProductsService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data   
      },
      complete:()=>{
        $(".loading").fadeOut(1000)
      }
      
    });
  }

  getId() {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
  }

}
