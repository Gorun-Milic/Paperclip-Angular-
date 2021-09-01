import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../dto/product/product';
import { ProductWithPhoto } from '../dto/product/productWithPhoto';
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

}
