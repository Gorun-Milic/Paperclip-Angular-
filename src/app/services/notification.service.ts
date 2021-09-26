import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../dto/notification/notification';
import { NotificationDto } from '../dto/notification/notificationDto';
import { Product } from '../dto/product/product';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getNotifications(user: User): Observable<NotificationDto> {
    return this.http.post<NotificationDto>('http://localhost:8080/notification/count', user);
  }

  getOldNotifications(user: User): Observable<Notification[]> {
    return this.http.post<Notification[]>('http://localhost:8080/notification/old', user);
  }

  viewNotifications(product: Product): Observable<any> {
    return this.http.post<any>('http://localhost:8080/notification/view', product);
  }

}
