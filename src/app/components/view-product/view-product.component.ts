import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserListDialogComponent } from 'src/app/components/user-list-dialog/user-list-dialog.component';
import { Category } from 'src/app/dto/category/category';
import { Comment } from 'src/app/dto/comment/comment';
import { Likes } from 'src/app/dto/likes/likes';
import { LikesDto } from 'src/app/dto/likes/likesDto';
import { Product } from 'src/app/dto/product/product';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { Save } from 'src/app/dto/save/save';
import { User } from 'src/app/dto/user/user';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { SaveService } from 'src/app/services/save.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productId: string;
  product: ProductWithPhoto;
  comment: Comment = new Comment('', new Date(), new User(), new Product('', '', new Category('', '', false), new User()));
  user: User;
  comments: Comment[];
  likes: Likes = new Likes();
  likesDto: LikesDto = new LikesDto([], 0);
  liked: boolean = false;

  save: Save = new Save();
  saved: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private userStorageService: UserStorageService,
              private commentService: CommentService,
              private likesService: LikeService,
              private saveService: SaveService,
              private dialog: MatDialog,
              private notificationService: NotificationService
              ) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('productid');
      this.getProduct();
    });
  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe(
      (res)=>{
        this.product = res;
        this.getComments();
        this.isLiked();
        this.getLikes();
        this.isSaved();
        this.viewNotification();
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  viewNotification() {
    if (this.product.user.id===this.user.id) {
      this.notificationService.viewNotifications(this.product).subscribe(
        (res)=>{
          console.log(res);
        },
        (err)=>{
          console.error(err);
        }
      )
    }
  }

  getComments() {
    this.commentService.commentsForProduct(this.product).subscribe(
      (res)=>{
        this.comments = res;
      },
      (error)=>{
        console.error(error);
      }
    );
  }

  addComment() {
    this.comment.product = this.product;
    this.comment.user = this.user;
    this.comment.date =  new Date();
    this.commentService.addComment(this.comment).subscribe(
      (res)=>{
        this.comment.text = '';
        this.getComments();
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  isLiked() {
    this.likes.product = this.product;
    this.likes.user = this.user;
  
    this.likesService.isLiked(this.likes).subscribe(
      (res)=>{
        this.likes.id = res.id;
        this.liked = true;
      },
      (err)=> {
          this.liked = false;
        }
    );
  }

  addLike() {
    this.likes.product = this.product;
    this.likes.user = this.user;
    if (!this.liked) { 
      this.likesService.addLike(this.likes).subscribe(
        (res)=>{
          this.isLiked();
          this.getLikes();
        },
        (err)=>{
          console.error(err);
        });
    }else {
      this.likesService.dislike(this.likes.id).subscribe(
        (res)=>{
          this.isLiked();
          this.getLikes();
        },
        (err)=>{
          console.error(err);
        });
    }
  }

  getLikes() {
    this.likesService.getLikes(this.product).subscribe(
      (res)=>{
        this.likesDto = res;
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  openUserListDialog() {
    if (this.likesDto.total>0) {
      let dialogRef = this.dialog.open(UserListDialogComponent, {
        data: { users: this.likesDto.users},
      });
    }
  }

  showUser(id: string) {
    if (id===this.userStorageService.getUser().id) {
      this.router.navigate(['my-profile']);
    }else {
      this.router.navigate(['/view-user', id]);
    }
  }

  isSaved() {
    this.save.product = this.product;
    this.save.user = this.user;

    console.log(this.save.product);
    console.log(this.save.user);
  
    this.saveService.isSaved(this.save).subscribe(
      (res)=>{
        this.save = res;
        this.saved = true;
      },
      (err)=>{
        this.saved = false;
        console.error("Product not saved. " + err);
      }
    );
  }

  addSave() {
    this.save.product = this.product;
    this.save.user = this.user;
    if (!this.saved) {
      this.saveService.save(this.save).subscribe(
        (res)=>{
          this.isSaved();
        }
      )
    }
  }

  forget() {
    if (this.saved) {
      this.saveService.forget(this.save.id).subscribe(
        (res)=>{
          this.isSaved();
        },
        (err)=>{
          console.error("Product not forgoten. " + err);
        }
      )
    }
  }

}
