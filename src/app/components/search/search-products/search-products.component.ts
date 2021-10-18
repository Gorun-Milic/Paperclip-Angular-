import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/dto/category/category';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { SearchProduct } from 'src/app/dto/product/searchProduct';
import { SearchProductParams } from 'src/app/dto/product/searchProductParams';
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

  searchProductParam: SearchProductParams = new SearchProductParams('', 'All', 'All', 1, 8);

  displayFilters = false;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.categoryService.findAll().subscribe(
      (res)=>{this.categories = res},
      (err)=>{console.error('Can not find categories.')}
    );

    this.productService.pagination1(this.searchProductParam).subscribe(
      (res)=>{
        this.products = res.products;
        this.total = res.total;
      },
      (err)=>{
        console.error("Some error occured!");
      }
    );
  }

  clickSearch() {
    this.searchProductParam.currentPage = 1;
    this.searchProducts();
  }

  searchProducts() {
    this.productService.pagination1(this.searchProductParam).subscribe(
      (res=>{
        this.products = res.products;
        this.total = res.total;
      })
    );
  }

  previousPage() {
    if (this.searchProductParam.currentPage>1) {
      this.searchProductParam.currentPage -= 1;
      this.searchProducts();
    }
  }

  nextPage() {
    if (this.total> this.searchProductParam.currentPage * this.searchProductParam.pageSize) {
      this.searchProductParam.currentPage += 1;
      this.searchProducts();
    }
  }

  showProduct(id: string) {
    this.router.navigate(['/view-product', id]);
  }

  showFilter() {
    this.displayFilters = !this.displayFilters;
  }

}
