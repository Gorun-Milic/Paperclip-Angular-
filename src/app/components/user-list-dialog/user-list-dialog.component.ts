import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/dto/user/user';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.css']
})
export class UserListDialogComponent implements OnInit {

  users: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {users: User[]},
    private router: Router,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit() {
    this.users = this.data.users;
  }

  showUser(id: string) {
    if (id===this.userStorageService.getUser().id) {
      this.router.navigate(['my-profile']);
    }else {
      this.router.navigate(['/view-user', id]);
    }
  }

}
