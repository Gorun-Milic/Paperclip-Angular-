import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Chat } from '../dto/chat/chat';
import { Message } from '../dto/message/message';
import { MessageService } from '../services/message.service';

@Directive({
  selector: '[appChat]'
})
export class ChatDirective implements OnInit {

  @Input()
  chat: Chat

  lastMessage: Message;

  constructor(
    private elementRef: ElementRef,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.findLastMessage();
  }

  findLastMessage() {
    this.messageService.findLastMessage(this.chat).subscribe(
      (res)=>{
        this.lastMessage = res;
        this.changeElement();
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  changeElement() {
    this.elementRef.nativeElement.innerText = this.lastMessage.text;
  }

}
