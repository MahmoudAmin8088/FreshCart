import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl='https://ecommerce.routemisr.com';
  userData:BehaviorSubject<any>= new BehaviorSubject(null);
  
  constructor(private _HttpClient:HttpClient,private _Router:Router,private _cart:CartService) { 
    if(localStorage.getItem('userToken') !== null){
      this.decodeUserData();  
    }
  }
  
 
  decodeUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);     
  }


  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  register(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/auth/signup`,userData);
  }
  login(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/auth/signin`,userData);
  }
  forgetPassword(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/auth/forgotPasswords`,userData)
  }
  resetCode(userData:object):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/auth/verifyResetCode`,userData)
  }
  resetPassword(userData:object):Observable<any>{
    return this._HttpClient.put(`${this.baseurl}/api/v1/auth/resetPassword`,userData)
  }
}
