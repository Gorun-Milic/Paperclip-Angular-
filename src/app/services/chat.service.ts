import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../dto/chat/chat';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
  ) { }

  findChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>('http://localhost:8080/chat/findChat', chat);
  }

  addChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>('http://localhost:8080/chat/add', chat);
  }

  findChats(user: User): Observable<Chat[]> {
    return this.http.post<Chat[]>('http://localhost:8080/chat/findChats', user);
  }

  findOne(id: string): Observable<Chat> {
    return this.http.get<Chat>('http://localhost:8080/chat/' + id);
  }
}
