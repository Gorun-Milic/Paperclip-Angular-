import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/dto/category/category';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { SearchProduct } from 'src/app/dto/product/searchProduct';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  categories: Category[];
  products: ProductWithPhoto[];
  total: number;
  searchProduct: SearchProduct = new SearchProduct('', new Category('jafisgszdfzjkzflsdfad', 'Food', true), true, 1, 16);

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(
      (res)=>{this.categories = res},
      (err)=>{console.error('Can not find categories.')}
    );

    this.productService.pagination(this.searchProduct).subscribe(
      (res)=>{
        this.products = res.products;
        this.total = res.total;
      },
      (err)=>{
        console.error("Some error occured!");
      }
    );
  }

  searchProducts() {
    console.log("Ime: " + this.searchProduct.name);
    console.log("Kategorija: " + this.searchProduct.category.name);
    console.log("Produkt?: " + this.searchProduct.isProduct);
    this.productService.pagination(this.searchProduct).subscribe(
      (res=>{
        this.products = res.products;
      })
    );
  }

  previousPage() {
    if (this.searchProduct.currentPage>1) {
      this.searchProduct.currentPage -= 1;
      this.searchProducts();
    }
  }

  nextPage() {
    if (this.total> this.searchProduct.currentPage * this.searchProduct.pageSize) {
      this.searchProduct.currentPage += 1;
      this.searchProducts();
    }
  }

  showProduct(id: string) {
    console.log("AAAAAAAAAAAAAAAAAA" + ": " + id);
    this.router.navigate(['/view-product', id]);
  }

}
