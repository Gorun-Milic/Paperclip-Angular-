import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/dto/user/user';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User;

  constructor(private userStorageService: UserStorageService, private dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
  }

  openDialog() {
    this.dialog.open(AddProductComponent);
  }

}
