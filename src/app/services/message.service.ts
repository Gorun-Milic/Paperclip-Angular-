import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../dto/chat/chat';
import { CountNewMessage } from '../dto/message/countNewMessage';
import { Message } from '../dto/message/message';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>('http://localhost:8080/message/add', message);
  }

  findMessages(chat: Chat): Observable<Message[]> {
    return this.http.post<Message[]>('http://localhost:8080/message/findMessages', chat);
  }

  findLastMessage(chat: Chat): Observable<Message> {
    return this.http.post<Message>('http://localhost:8080/message/findLastMessage', chat);
  }

  countNewMessages(user: User): Observable<number> {
    return this.http.post<number>('http://localhost:8080/message/countNewMessages', user);
  }

  countNewMessagesInChat(countNewMessageDto: CountNewMessage): Observable<number> {
    return this.http.post<number>('http://localhost:8080/message/countNewMessagesInChat', countNewMessageDto);
  }

  updateMessage(countNewMessageDto: CountNewMessage): Observable<any> {
    return this.http.post<number>('http://localhost:8080/message/updateMessage', countNewMessageDto);
  }

}
