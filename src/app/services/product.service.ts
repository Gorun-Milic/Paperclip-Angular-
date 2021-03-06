import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../dto/product/product';
import { ProductPagination } from '../dto/product/productPagination';
import { ProductStatistics } from '../dto/product/productStatistics';
import { ProductWithPhoto } from '../dto/product/productWithPhoto';
import { SearchProduct } from '../dto/product/searchProduct';
import { SearchProductParams } from '../dto/product/searchProductParams';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/product/upload', formData);
  }

  getProductsOfUser(user: User): Observable<ProductWithPhoto[]> {
    return this.http.post<ProductWithPhoto[]>('http://localhost:8080/product/productsOfUser', user);
  }

  getProduct(id: string): Observable<ProductWithPhoto> {
    return this.http.get<ProductWithPhoto>('http://localhost:8080/product/' + id);
  }

  getProducts(): Observable<ProductWithPhoto[]> {
    return this.http.get<ProductWithPhoto[]>('http://localhost:8080/product');
  }

  pagination(searchProduct: SearchProduct): Observable<ProductPagination> {
    return this.http.post<ProductPagination>('http://localhost:8080/product/pagination', searchProduct);
  }

  pagination1(searchProduct: SearchProductParams): Observable<ProductPagination> {
    return this.http.post<ProductPagination>('http://localhost:8080/product/pagination1', searchProduct);
  }

  getStatistics(): Observable<ProductStatistics[]> {
    console.log("bla bla bla");
    return this.http.get<ProductStatistics[]>('http://localhost:8080/product/getStatistics');
  }

}
