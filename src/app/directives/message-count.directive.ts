import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Chat } from '../dto/chat/chat';
import { CountNewMessage } from '../dto/message/countNewMessage';
import { MessageService } from '../services/message.service';
import { UserStorageService } from '../services/user-storage.service';

@Directive({
  selector: '[appMessageCount]'
})
export class MessageCountDirective implements OnInit{

  @Input()
  chat: Chat

  messageNumber = 0;

  constructor(
    private elementRef: ElementRef,
    private messageService: MessageService,
    private userStorageService: UserStorageService
  ) { }
  
  ngOnInit(): void {
    this.countMessages();  
  }

  countMessages() {
    let countMessagesObject: CountNewMessage = new CountNewMessage();
    countMessagesObject.chat = this.chat;
    countMessagesObject.user = this.userStorageService.getUser();

    this.messageService.countNewMessagesInChat(countMessagesObject).subscribe(
      (res)=>{
        this.messageNumber = res;
        this.changeElement();
      },
      (err)=>{
        console.log(err);
      }
    )
    
  }

  changeElement() {
    if (this.messageNumber>0) {
      this.elementRef.nativeElement.innerText = this.messageNumber;
    }else {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

}
