import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../dto/user/loginDto';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  host: 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/user/registration', user);
  }

  login(user: LoginDto): Observable<User> {
    return this.http.post<User>('http://localhost:8080/user/login', user);
  }
}
