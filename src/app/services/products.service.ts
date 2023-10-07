import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseurl='https://ecommerce.routemisr.com';

  constructor(private _HttpClient:HttpClient) { }

  getProduct(page:string):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/products?page=${page}`);
  }
  getProductById(id:string):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/products/${id}`);
  }
  getCatagories():Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/categories`);
  }
}
