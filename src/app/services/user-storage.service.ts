import { Injectable } from '@angular/core';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  saveUser(user: User) {
    if (sessionStorage.getItem('user_key') !== null) {
      sessionStorage.removeItem('user_key');
    }
    sessionStorage.setItem('user_key', JSON.stringify(user));
  }

  getUser(): User {
    const user = sessionStorage.getItem('user_key');
    return user !== null ? JSON.parse(user) : null;
  }
}
