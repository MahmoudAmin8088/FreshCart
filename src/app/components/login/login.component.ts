import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private AuthService:AuthService,private cart:CartService,private Router:Router ,private titleService :Title ){
    titleService.setTitle('Login');
    if(localStorage.getItem('userToken') !== null){
      Router.navigate(['/home']);
    }
  }
  
  isLoading: Boolean = false;
  apiErrors: string = '';
  apiErr: string = '';
  
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    
    password: new FormControl(null, [Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,8}$/)]),
    });
    
    handleLogin(loginForm:FormGroup){
      this.isLoading=true;
      if(loginForm.valid){
        this.AuthService.login(loginForm.value).subscribe({
          next:(response)=>{
            this.isLoading=false;
            if(response.message === 'success'){
              localStorage.setItem('userToken',response.token);
              this.AuthService.decodeUserData();
              window.location.reload();
              this.Router.navigate(['/home']);
            }
        },
        error:(err)=>{
          this.isLoading = false;
          
          this.apiErrors = err.error.errors?.msg;
          this.apiErr = err.error.message;

        }
      });
    }

  }
}
