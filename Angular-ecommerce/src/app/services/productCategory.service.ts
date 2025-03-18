import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private baseUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.baseUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
