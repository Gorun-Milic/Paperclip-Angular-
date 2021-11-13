import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
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

  user: User = new User();
  myProducts: ProductWithPhoto[] = [];

  //photo data
  public selectedFile;
  convertedImage = undefined;
  buttonDisabled = true;

  showMessage = true;

  

  constructor(private userStorageService: UserStorageService, 
              private dialog: MatDialog,
              private productService: ProductService,
              private userService: UserService,
              private router: Router
              ) { }

  ngOnInit() {
      this.getUserData();
  }

  getUserData() {
    this.user = this.userStorageService.getUser();
    this.getProducts();
    if (this.user.photo != undefined) {
      this.convertedImage = 'data:image/jpeg;base64,' + this.user.photo;
    }  
  }

  getProducts() {
    // console.log("Izlistavamo proizvode");
    this.productService.getProductsOfUser(this.user).subscribe(
      (res)=>{
        this.myProducts = res;
      },
      (err)=>{
        alert("Dobavljanje nije uspelo");
        console.error("Some error occured!");
      }
    );

  }

  openDialog() {
    let dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        this.getProducts();
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

  showProduct(id: string) {
    this.router.navigate(['/view-product', id]);
  }

  refreshComponent() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/my-profile']);
    });
  }

}
