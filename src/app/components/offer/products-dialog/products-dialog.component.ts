import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { User } from 'src/app/dto/user/user';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.css']
})
export class ProductsDialogComponent implements OnInit {

  products: ProductWithPhoto[];

  constructor(
    public dialogRef: MatDialogRef<ProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();

  }

  getProducts() {
    this.productService.getProductsOfUser(this.data.user).subscribe(
      (res)=>{
        this.products = res;
      },
      (err)=>{
        console.error("Some error occured!");
      }
    );
  }

  chooseProduct(i: number) {
    this.dialogRef.close({
      product: this.products[i]
    });
  }

}
