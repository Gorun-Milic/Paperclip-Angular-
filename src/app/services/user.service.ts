import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../dto/jwtDto';
import { LoginDto } from '../dto/user/loginDto';
import { SearchUser } from '../dto/user/searchUser';
import { SearchUserParams } from '../dto/user/searchUserParams';
import { User } from '../dto/user/user';
import { UserPagination } from '../dto/user/userPagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  host: 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>('http://localhost:8080/user/' + id);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/user/registration', user);
  }

  login(loginDto: LoginDto): Observable<JwtDto> {
    return this.http.post<JwtDto>('http://localhost:8080/auth/login', loginDto);
  }

  getUserFromJwt(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/auth/getUserFromJwt');
  }

  changePhoto(formData: FormData): Observable<User> {
    return this.http.post<User>('http://localhost:8080/user/changePhoto', formData);
  }

  pagination(searchUser: SearchUser): Observable<UserPagination> {
    return this.http.post<UserPagination>('http://localhost:8080/user/pagination', searchUser);
  }

  pagination1(searchUser: SearchUserParams): Observable<UserPagination> {
    return this.http.post<UserPagination>('http://localhost:8080/user/pagination1', searchUser);
  }
}
