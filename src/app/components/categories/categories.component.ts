import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/services/products.service';
declare let $:any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  constructor(private titleService:Title ,private _ProductsService:ProductsService){
    titleService.setTitle('Categories')
  }
  ngOnInit(): void {
   this.getCategories();
  }

  getCategories(){
    this._ProductsService.getCatagories().subscribe({
      next:(response)=>{
        this.categories = response.data
        $(".loading").fadeOut(1000);
      }
     });
  }

}
