import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  baseurl='https://ecommerce.routemisr.com';

  headers:any={
    token:localStorage.getItem('userToken')
   }

  addProductToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/wishlist`,
    {productId:productId},
    {headers:this.headers}
    );
  }
  removeProductfromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseurl}/api/v1/wishlist/${productId}`,
    {headers:this.headers}
    );
  }
  getUserWishlist():Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/wishlist`,
    {headers:this.headers}
    );
  }

}
