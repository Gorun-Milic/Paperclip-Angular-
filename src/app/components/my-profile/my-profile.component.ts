import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Product } from 'src/app/dto/product/product';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { User } from 'src/app/dto/user/user';
import { ProductService } from 'src/app/services/product.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User;
  myProducts: ProductWithPhoto[];

  product: ProductWithPhoto;

  constructor(private userStorageService: UserStorageService, 
              private dialog: MatDialog,
              private productService: ProductService) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.productService.getProductsOfUser(this.userStorageService.getUser()).subscribe(
      (res)=>{
        this.myProducts = res;
      },
      (err)=>{
        console.error("Some error occured!");
      }
    );
    this.productService.getProduct("ef21a3c1-6b8f-4069-87ce-02d7767dd718").subscribe(
      (res=>{this.product = res})
    );
    
  }

  openDialog() {
    this.dialog.open(AddProductComponent);
  }

}
