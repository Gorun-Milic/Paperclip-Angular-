import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/dto/category/category';
import { Product } from 'src/app/dto/product/product';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product('', 0, '', new Category('', ''));

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(
      (res)=>{this.categories = res},
      (err)=>{console.log('Can not find categories.')}
    );
  }

}
