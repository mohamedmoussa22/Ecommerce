import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products : Product[] = [];
  constructor(private productService:ProductService , private activedRoute : ActivatedRoute){}
  currentCategoryId !:number;


  ngOnInit():void{
    this.activedRoute.paramMap.subscribe(()=>{
      this.listProducts();
    });
    
  }

  listProducts() {
    const hasCategoryId: boolean = this.activedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId){
      this.currentCategoryId = +this.activedRoute.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
