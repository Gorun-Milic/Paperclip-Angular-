import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/dto/chat/chat';
import { User } from 'src/app/dto/user/user';
import { ChatService } from 'src/app/services/chat.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  user: User = new User();
  chats: Chat[];

  constructor(
        private chatService: ChatService,
        private userStorageService: UserStorageService,
        private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.chatService.findChats(this.user).subscribe(
        (res)=>{
          this.chats = res;
        },
        (err)=>{
          console.error(err);
        }
    );
  }

  showChat(id: string) {
    this.router.navigate(['/chat', id]);
  }

}
