import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private AuthService: AuthService, private Router: Router , private titleService:Title) {
    titleService.setTitle('Register')
    
    if(localStorage.getItem('userToken') !== null){
      Router.navigate(['/home'])
    }
   }

  isLoading: Boolean = false;
  apiErrors: string = '';
  apiErr: string = '';
  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3)
      , Validators.maxLength(20)]),

    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^[A-Z][a-z0-9]{5,8}$/)]),

    rePassword: new FormControl(null, [Validators.required,
    Validators.pattern(/^[A-Z][a-z0-9]{5,8}$/)]),

    phone: new FormControl(null, [Validators.required,
    Validators.pattern(/^01[0125][0-9]{8}$/)])

  },{validators:this.rePasswordMatching});

  rePasswordMatching(registerForm:any){

    let password = registerForm.get('password');
    let rePassword = registerForm.get('rePassword');
    // let password = registerForm.controls['password'];
    // let rePassword = registerForm.controls['rePassword'];

    console.log(password.value,rePassword.value);
    

    if(password?.value == rePassword?.value){
      return null
    }
    else{
      rePassword.setErrors({rePassword:"Password is Not Matched:"});
      return {rePassword:"Password is Not Matched:"}

    }
  }


  handleRegister(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this.AuthService.register(registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            this.Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;

          this.apiErrors = err.error.errors?.msg;

          this.apiErr = err.error.message;

        }
      });
    }

  }

}
