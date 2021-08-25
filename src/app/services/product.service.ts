import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../dto/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/product', product);
  }

}
