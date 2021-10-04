import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chat } from 'src/app/dto/chat/chat';
import { CountNewMessage } from 'src/app/dto/message/countNewMessage';
import { Message } from 'src/app/dto/message/message';
import { User } from 'src/app/dto/user/user';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked  {

  // @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;

  user: User;
  otherUser: User;
  chatId: string;
  chat: Chat;
  messages: Message[];
  message: Message;

  constructor(
      private route: ActivatedRoute,
      private chatService: ChatService,
      private messageService: MessageService,
      private userStorageService: UserStorageService
  ) { }

  ngAfterViewChecked(): void {
    
  }

  ngOnInit() {
    this.message = new Message();
    this.user = this.userStorageService.getUser();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chatId = params.get('chatid');
      this.getChat();
    });
  }

  getChat() {
    this.chatService.findOne(this.chatId).subscribe(
      (res)=>{
        this.chat = res;
        this.getOtherUser();
        this.findMessages();
        this.updateMessage();
      },
      (err)=>{
        console.error(err);
      }
    )
  }

  findMessages() {
    this.messageService.findMessages(this.chat).subscribe(
      (res)=>{
        this.messages = res;
        // this.scrollToBottom();
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  sendMessage() {
    this.message.user = this.user;
    this.message.chat = this.chat;
    this.message.seen = 0;
    
    this.messageService.addMessage(this.message).subscribe(
      (res)=>{
        this.message.text = '';
        this.findMessages();
      },
      (err)=>{
        alert("Message not sent");
      }
    )
  }

  getOtherUser() {
    if (this.chat.user1.id===this.user.id) {
      this.otherUser = this.chat.user2;
    }else {
      this.otherUser = this.chat.user1;
    }
  }

  // scrollToBottom(): void {
  //   try {
  //       this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch(err) { 
  //   }                 
  // }

  updateMessage() {
    let updateMessage: CountNewMessage = new CountNewMessage();
    updateMessage.chat = this.chat;
    updateMessage.user = this.user;
    this.messageService.updateMessage(updateMessage).subscribe(
      (res)=>{
       
      },
      (err)=>{
        
      }
    );
  }



}
