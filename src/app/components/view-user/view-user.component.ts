import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Chat } from 'src/app/dto/chat/chat';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { User } from 'src/app/dto/user/user';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  userId: string;
  user: User;

  products: ProductWithPhoto[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
    private userStorageService: UserStorageService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('userid');
      this.getUser();
    });
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(
      (res)=>{
        this.user = res;
        this.getProducts();
      },
      (err)=>{
        console.error(err);
      }
    )
  }

  getProducts() {
    this.productService.getProductsOfUser(this.user).subscribe(
      (res)=>{
        this.products = res;
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  showProduct(id: string) {
    this.router.navigate(['/view-product', id]);
  }

  showChat(id: string) {
    this.router.navigate(['/chat', id]);
  }

  openDialog() {
    let chat: Chat = new Chat();
    chat.user1 = this.userStorageService.getUser();
    chat.user2 = this.user;

    this.chatService.findChat(chat).subscribe(
      (res)=>{
        this.showChat(res.id);
      },
      (err)=>{
        let dialogRef = this.dialog.open(MessageDialogComponent, {
          data: {
            chat: chat
          }
        });
      }
    );

  }

  sendOffer() {
    this.router.navigate(['/create-offer', this.userId]);
  }


}
