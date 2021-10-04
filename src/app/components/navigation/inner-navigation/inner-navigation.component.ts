import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { interval, timer } from 'rxjs';
import { Notification } from 'src/app/dto/notification/notification';
import { User } from 'src/app/dto/user/user';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { NotificationsDialogComponent } from '../../notifications-dialog/notifications-dialog.component';

@Component({
  selector: 'app-inner-navigation',
  templateUrl: './inner-navigation.component.html',
  styleUrls: ['./inner-navigation.component.css']
})
export class InnerNavigationComponent implements OnInit {

  @ViewChild('notificationCountElement', {static: false})
  notificationCountElement;

  @ViewChild('navItemMessage', {static: false})
  navItemMessage;

  @ViewChild('messageCountElement', {static: false})
  messageCountElement;

  @ViewChild('navItemNotification', {static: false})
  navItemNotification;

  user: User;
  notificationCount: number = 0;
  notifications: Notification[];

  newMessagesCount: number = 0;

  constructor(
    private notificationService: NotificationService,
    private userStorageService: UserStorageService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) { }
  
  // ngAfterViewInit(): void {
  //   this.setStyleMessages();
  //   this.setStyleNotifications();
  // }

  ngOnInit() {
    // this.messageCountElement.nativeElement.style.display = 'none';
    // this.notificationCountElement.nativeElement.style.display = 'none';
    
    this.user = this.userStorageService.getUser();

    const obs$ = timer(0, 2000);

    obs$.subscribe(
      (time)=>{
        this.getNotifications();
        this.countNewMessages();
      }
    );
  }

  getNotifications() {
    this.notificationService.getNotifications(this.user).subscribe(
      (res)=>{
        this.notifications = res.notifications;
        this.notificationCount = res.total;
        this.setStyleNotifications();
      }
    );
  }

  openNotificationsDialog() {
    let dialogRef = this.dialog.open(NotificationsDialogComponent, {
      data: { notifications: this.notifications },
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        
      })
  }

  countNewMessages() {
    this.messageService.countNewMessages(this.user).subscribe(
      (res)=>{
        this.newMessagesCount = res;
        this.setStyleMessages();
      },
      (err)=>{
        alert("Doslo je do greske");
      }
    );
  }


  // Element je po defaultu display none, tako da svi elementi u navigaciji imaju padding 0.2rem. Onog trenutka kad
  // se countuje broj poruka, ako se ispostavi da ima vise od 0 poruka notifikacija postaje display inline-block
  // Tada element dobija padding 0, kako se nebi sabirao 0.2 + 0.2. Ako broj poruka kasnije opet postane 0, notifikacioni
  // element opet postaje display none, a padding elementa postavljamo na 0.2
  setStyleMessages() {
    if (this.newMessagesCount===0) {
      this.messageCountElement.nativeElement.style.display = 'none';
      this.navItemMessage.nativeElement.style.padding = '0.2rem';
    }else {
      this.messageCountElement.nativeElement.style.display = 'inline-block';
      this.navItemMessage.nativeElement.style.padding = '0rem';
    }
  }

  setStyleNotifications() {
    if (this.notificationCount===0) {
      this.notificationCountElement.nativeElement.style.display = 'none';
      this.navItemNotification.nativeElement.style.padding = '0.2rem';
    }else {
      this.notificationCountElement.nativeElement.style.display = 'inline-block';
      this.navItemNotification.nativeElement.style.padding = '0rem';
    }
  }


}
