import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from 'src/app/dto/category/category';
import { Comment } from 'src/app/dto/comment/comment';
import { Product } from 'src/app/dto/product/product';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { User } from 'src/app/dto/user/user';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productId: string;
  product: ProductWithPhoto;
  comment: Comment = new Comment('', new Date(), new User('', '', '', '', '', '', '', ''), new Product('', '', new Category('', '', false), new User('', '', '', '', '', '', '', '')));
  user: User;
  comments: Comment[];

  // productId: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private userStorageService: UserStorageService,
              private commentService: CommentService,
              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('productid');
      this.getProduct();
    });
    this.user = this.userStorageService.getUser();
  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe(
      (res)=>{
        this.product = res;
        this.getComments();
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  getComments() {
    this.commentService.commentsForProduct(this.product).subscribe(
      (res)=>{
        this.comments = res;
        this.getProduct();
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
      },
      (err)=>{
        console.error(err);
      }
    );
  }

}
