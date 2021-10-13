import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Chat } from 'src/app/dto/chat/chat';
import { Message } from 'src/app/dto/message/message';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  message: Message = new Message();

  chatExist = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {chat: Chat},
    private chatService: ChatService,
    private messageService: MessageService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }


  sendMessage(message: Message) {
    message.user = this.data.chat.user1;
    message.seen = 0;
    this.messageService.addMessage(message).subscribe(
      (res)=>{
        this.toastrService.success("Message was sent", "Success");
      },
      (err)=>{
        this.toastrService.error("Message not sent", "Error");
      }
    )
  }

  findAndAdd() {
    this.chatService.findChat(this.data.chat).subscribe(
      (res)=>{
        this.message.chat = res;
        this.sendMessage(this.message);
      },
      (err)=>{
        this.addChat();
      }
    )
  }

  addChat() {
    this.chatService.addChat(this.data.chat).subscribe(
      (res)=>{
        this.message.chat = res;
        this.sendMessage(this.message);
      },
      (err)=>{
        console.error(err);
      }
    );
  }

}
