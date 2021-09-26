import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Notification } from 'src/app/dto/notification/notification';
import { User } from 'src/app/dto/user/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.css']
})
export class NotificationsDialogComponent implements OnInit {

  user: User;
  message = '';
  newNotifications = [];
  oldNotifications = [];

  buttonEnabled = true;

  constructor(
              public dialogRef: MatDialogRef<NotificationsDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: {notifications: Notification[]},
              private notificationService: NotificationService,
              private userStorageService: UserStorageService,
              private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.newNotifications = this.data.notifications;
  }

  getOldNotifications() {
    this.buttonEnabled = false;
    this.notificationService.getOldNotifications(this.user).subscribe(
      (res)=>{
        this.oldNotifications = res;
      },
      (err)=>{
        this.message = "No more notifications"
      }
    );
  }

  openProduct(id: string) {
    this.router.navigate(['/view-product', id]);
  }

}
