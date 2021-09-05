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

  

  constructor(private userStorageService: UserStorageService, 
              private dialog: MatDialog,
              private productService: ProductService) { }

  ngOnInit() {
      this.getUserData();
  }

  getUserData() {
    this.user = this.userStorageService.getUser();
    this.productService.getProductsOfUser(this.userStorageService.getUser()).subscribe(
      (res)=>{
        this.myProducts = res;
      },
      (err)=>{
        console.error("Some error occured!");
      }
    );  
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res === "yes") {
          this.getUserData();        }
      }
    )
  }

}
