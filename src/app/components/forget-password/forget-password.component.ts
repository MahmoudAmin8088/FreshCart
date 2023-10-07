import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare let $:any;
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}
  apiError:string='';
  isloading:boolean=false;
  
  forgetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  });
  VerifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)])
  });


  handleForgetPassword(forgetPassword:FormGroup){
    this.isloading=true;
    this._AuthService.forgetPassword(forgetPassword.value).subscribe({
      next:(response)=>{
        this.isloading=false
       if(response.statusMsg === 'success' ){
        // remove d-none add style ='display:none' to work with jq
        // $('#Remail').fadeOut(1000);
        // $('#Vcode').fadeIn(1000);
        document.getElementById('Remail')?.classList.add("d-none");
        document.getElementById('Vcode')?.classList.remove("d-none");
       }
      },
      error:(err)=>{
        this.isloading=false;
        this.apiError= err.error.message;
        console.log(err);
        
      }
    });
    
  }
  handleVerifyCode(VerifyCode:FormGroup){
    this.isloading=true;
    this._AuthService.resetCode(VerifyCode.value).subscribe({
      next:(response)=>{
        this.isloading=false;
        if(response.status === 'Success')
        {
          this._Router.navigate(['/reset']);
        }
        console.log(response);
      },
      error:(err)=>{
        this.isloading=false;
        this.apiError= err.error.message;        
      }
    }); 
  }
}
