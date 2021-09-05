import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../dto/comment/comment';
import { Product } from '../dto/product/product';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:8080/comment', comment);
  }

  commentsForProduct(product: Product): Observable<Comment[]> {
    return this.http.post<Comment[]>('http://localhost:8080/comment/commentsForProduct', product);
  }

}
