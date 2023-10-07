import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  numberOfCartItem = new BehaviorSubject(0);
  baseurl='https://ecommerce.routemisr.com';
  constructor(private _HttpClient:HttpClient) {
    this.getUserCart().subscribe({
      next:(response)=>{
        this.numberOfCartItem.next(response.numOfCartItems);
      },
      error:(err)=>console.log(err)  
    });
   }
   
   headers:any={
    token:localStorage.getItem('userToken')
   }

   

   addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/cart`,
    {productId:id},
    {headers:this.headers}
    );

   }
   getUserCart():Observable<any>{
    
    return this._HttpClient.get(`${this.baseurl}/api/v1/cart` , {headers:this.headers} );

   }
   removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseurl}/api/v1/cart/${productId}`,
    {headers:this.headers}
    );
   }
   updateQuantity(productId:string ,count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseurl}/api/v1/cart/${productId}`, {count:count},
    {headers:this.headers}
    );
   }
   clearCart():Observable<any>{
    return this._HttpClient.delete(`${this.baseurl}/api/v1/cart`,{headers:this.headers} );
   }
   onlinePayment(shippingAddress:any,cartId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`
    ,{
      shippingAddress:shippingAddress

    },
    {headers:this.headers}
    
    )

   }
   cashPayment(shippingAddress:any,cartId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
    ,{
      shippingAddress:shippingAddress

    },
    {headers:this.headers}
    
    )

   }

   getUserOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
   }

}
