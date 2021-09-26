import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { interval, timer } from 'rxjs';
import { Notification } from 'src/app/dto/notification/notification';
import { User } from 'src/app/dto/user/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { NotificationsDialogComponent } from '../../notifications-dialog/notifications-dialog.component';

@Component({
  selector: 'app-inner-navigation',
  templateUrl: './inner-navigation.component.html',
  styleUrls: ['./inner-navigation.component.css']
})
export class InnerNavigationComponent implements OnInit {

  user: User;
  notificationCount: number = 0;
  notifications: Notification[];

  constructor(
    private notificationService: NotificationService,
    private userStorageService: UserStorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();

    const obs$ = timer(0, 2000);

    obs$.subscribe(
      (time)=>{
        this.getNotifications();
      }
    );
  }

  getNotifications() {
    this.notificationService.getNotifications(this.user).subscribe(
      (res)=>{
        this.notifications = res.notifications;
        this.notificationCount = res.total;
      }
    );
  }

  countNotifications() {
    
  }

  openNotificationsDialog() {
    let dialogRef = this.dialog.open(NotificationsDialogComponent, {
      data: { notifications: this.notifications },
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        // this.notificationService.viewNotifications(this.user).subscribe(
        //   (res)=>{
        //     console.log("Uspelo");
        //     this.getNotifications();
        //   }
        // );
      })
  }

}
