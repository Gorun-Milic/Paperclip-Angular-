import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { Notification } from 'src/app/dto/notification/notification';
import { User } from 'src/app/dto/user/user';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { NotificationsDialogComponent } from '../../notifications-dialog/notifications-dialog.component';

@Component({
  selector: 'app-inner-navigation',
  templateUrl: './inner-navigation.component.html',
  styleUrls: ['./inner-navigation.component.css']
})
export class InnerNavigationComponent implements OnInit, OnDestroy {

  @ViewChild('notificationCountElement', {static: false})
  notificationCountElement;

  @ViewChild('navItemMessage', {static: false})
  navItemMessage;

  @ViewChild('messageCountElement', {static: false})
  messageCountElement;

  @ViewChild('navItemNotification', {static: false})
  navItemNotification;

  @ViewChild('offerCountElement', {static: false})
  offerCountElement

  @ViewChild('navItemOffer', {static: false})
  navItemOffer

  user: User;
  notificationCount: number = 0;
  notifications: Notification[];

  newMessagesCount: number = 0;

  offerCount: number = 0;

  obs$: Subscription;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userStorageService: UserStorageService,
    private messageService: MessageService,
    private offerService: OfferService,
    private dialog: MatDialog
  ) { }


  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
  

  ngOnInit() {
    
    this.user = this.userStorageService.getUser();

    const obs$ = timer(0, 2000)

    this.obs$ = timer(0,2000).subscribe(
      (time)=>{
        this.getNotifications();
        this.countNewMessages();
        this.countNewOffers();
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

  countNewOffers() {
    this.offerService.countNewOffers(this.user).subscribe(
      (res)=>{
        this.offerCount = res;
        this.setStyleOffer();
      },
      (err)=>{
        console.error(err);
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
      // this.navItemMessage.nativeElement.style.padding = '0.2rem';
    }else {
      this.messageCountElement.nativeElement.style.display = 'inline-block';
      // this.navItemMessage.nativeElement.style.padding = '0rem';
    }
  }

  setStyleNotifications() {
    if (this.notificationCount===0) {
      this.notificationCountElement.nativeElement.style.display = 'none';
      // this.navItemNotification.nativeElement.style.padding = '0.2rem';
    }else {
      this.notificationCountElement.nativeElement.style.display = 'inline-block';
      // this.navItemNotification.nativeElement.style.padding = '0rem';
    }
  }

  setStyleOffer() {
    if (this.offerCount===0) {
      this.offerCountElement.nativeElement.style.display = 'none';
      // this.navItemOffer.nativeElement.style.padding = '0.2rem';
    }else {
      this.offerCountElement.nativeElement.style.display = 'inline-block';
      // this.navItemOffer.nativeElement.style.padding = '0rem';
    }
  }

  logout() {
    sessionStorage.removeItem('user_key');
    localStorage.removeItem('jwt-token');
    this.router.navigate(['home']);
  }

}
