import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProduct(productId: Number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  getProductList(categoryId: Number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProudcts(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProudcts(searchUrl);
  }

  getProudcts(searchUrl: string) {
    return this.httpClient
      .get<GetResponseProduct>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    categoryId: Number
  ): Observable<GetResponseProduct> {
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` +
      `&page=${thePage}` +
      `&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  
  searchProductListPaginate(
    thePage: number,
    thePageSize: number,
    keyWord: string
  ): Observable<GetResponseProduct> {
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${keyWord}` +
      `&page=${thePage}` +
      `&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
