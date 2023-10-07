import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private _AuthService:AuthService ,private _Router:Router){}
  apiErrors:string=''
  isLoading:boolean=false;

  resetForm:FormGroup= new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    
    newPassword: new FormControl(null, [Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,8}$/)]),

  })
  resetPassword(resetForm:FormGroup){
    this.isLoading=true;
    this._AuthService.resetPassword(resetForm.value).subscribe({
      next:(response)=>{
        this.isLoading=false;
        if(response.token){
          this._Router.navigate(['/login']);
        }
      },
      error:(err)=>{
        this.isLoading=false;
        this.apiErrors = err.error.message
      }
    })
    
  }

}
