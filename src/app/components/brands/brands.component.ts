import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BrandService } from 'src/app/services/brand.service';
declare let $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands: any;
  brand: any;
  brandId: any = '';
  constructor(private titleService: Title, private _BrandService: BrandService) {
    titleService.setTitle('Brands')
  }

  ngOnInit(): void {
    this.GetAllBrands();
    this.pagenation();
  }

  pagenation() {
    $(".pagenum").click((e: any) => {
      let pagenum = $(e.target).text();
      this.GetAllBrands(pagenum)
    });
  }

  getBrandId(e:any) {
    this.brandId = $(e.target).next().text();
    this.getBrand();
   
  }

  
  GetAllBrands(page: string = '1') {
    this._BrandService.getAllBrands(page).subscribe({
      next: (response) => {
        this.brands = response.data;
        console.log(this.brands);
        $(".loading").fadeOut(1000);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  getBrand(){
    this._BrandService.getBrand(this.brandId).subscribe({
      next:(response)=>{
        this.brand=response.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
