import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Save } from 'src/app/dto/save/save';
import { User } from 'src/app/dto/user/user';
import { SaveService } from 'src/app/services/save.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-saved-products',
  templateUrl: './saved-products.component.html',
  styleUrls: ['./saved-products.component.css']
})
export class SavedProductsComponent implements OnInit {

  user: User;
  savedProducts: Save[] = [];

  constructor(
    private userStorageService: UserStorageService,
    private saveService: SaveService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.getSavedProducts();
  }

  getSavedProducts() {
    this.saveService.savedByUser(this.user).subscribe(
      (res)=>{
        this.savedProducts = res;
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  showProduct(id: string) {
    this.router.navigate(['/view-product', id]);
  }

}
