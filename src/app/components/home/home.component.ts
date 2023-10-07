import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userName: string = ''
  constructor(private titleService: Title, private _cartService: CartService, private _Auth: AuthService) {
    titleService.setTitle('Home');
    _Auth.decodeUserData();
    this.userName = _Auth.userData.value.name;
  }


}
