import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Likes } from '../dto/likes/likes';
import { LikesDto } from '../dto/likes/likesDto';
import { Product } from '../dto/product/product';
import { ProductWithPhoto } from '../dto/product/productWithPhoto';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  addLike(like: Likes): Observable<Likes> {
    return this.http.post<Likes>('http://localhost:8080/likes/addLike', like);
  }

  isLiked(like: Likes): Observable<Likes> {
    return this.http.post<Likes>('http://localhost:8080/likes/isLiked', like);
  }

  getLikes(product: ProductWithPhoto): Observable<LikesDto> {
    return this.http.post<LikesDto>('http://localhost:8080/likes/getLikes', product);
  }

  dislike(id: string): Observable<Likes> {
    return this.http.delete<Likes>('http://localhost:8080/likes/' + id);
  }
}
