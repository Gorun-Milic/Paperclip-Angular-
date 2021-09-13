import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Product } from 'src/app/dto/product/product';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { User } from 'src/app/dto/user/user';
import { ProductService } from 'src/app/services/product.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User;
  myProducts: ProductWithPhoto[];

  //photo data
  public selectedFile;
  convertedImage = undefined;
  buttonDisabled = true;

  

  constructor(private userStorageService: UserStorageService, 
              private dialog: MatDialog,
              private productService: ProductService,
              private userService: UserService
              ) { }

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
    if (this.user.photo != undefined) {
      this.convertedImage = 'data:image/jpeg;base64,' + this.user.photo;
    }  
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

  //adding photo mehods
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.buttonDisabled = false;
  }

  // This part is for uploading
  uploadPhoto() {
    let formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('userId', this.user.id);
    this.userService.changePhoto(formData).subscribe(
      (res)=>{
        this.userStorageService.saveUser(res);
        this.getUserData();
      },
      (err)=>{
        console.error("Can not change photo");
      }
    );
  }

}
