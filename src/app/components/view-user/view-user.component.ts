import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { User } from 'src/app/dto/user/user';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

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
    private productService: ProductService
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

}
