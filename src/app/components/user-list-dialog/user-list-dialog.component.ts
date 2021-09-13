import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/dto/user/user';

@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.css']
})
export class UserListDialogComponent implements OnInit {

  users: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {users: User[]},
  ) { }

  ngOnInit() {
    this.users = this.data.users;
  }

}
