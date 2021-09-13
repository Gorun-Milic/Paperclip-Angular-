import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Category } from 'src/app/dto/category/category';
import { Product } from 'src/app/dto/product/product';
import { User } from 'src/app/dto/user/user';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  user: User;

  product: Product = new Product('','', new Category('', '', true), new User());

  categories: Category[];

  selectedFile;

  constructor(private categoryService: CategoryService, 
              private userStorageService: UserStorageService, 
              private productService: ProductService,
              public dialogRef: MatDialogRef<AddProductComponent>) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.product.user = this.user;
    this.categoryService.findAll().subscribe(
      (res)=>{this.categories = res},
      (err)=>{console.error('Can not find categories.')}
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  addProduct() {
    let formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('product', JSON.stringify(this.product));
    this.productService.addProduct(formData).subscribe(
      (res)=>{
        alert('Product was added.');
        this.dialogRef.close('yes');
      },
      (err)=>{
        alert('Can not add product.');
        this.dialogRef.close()
      }
    );
  }

}
