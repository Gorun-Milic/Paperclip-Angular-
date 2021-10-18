import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Offer } from 'src/app/dto/offer/offer';
import { User } from 'src/app/dto/user/user';
import { OfferService } from 'src/app/services/offer.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { AcceptOfferDialogComponent } from '../accept-offer-dialog/accept-offer-dialog.component';
import { RejectOfferDialogComponent } from '../reject-offer-dialog/reject-offer-dialog.component';

@Component({
  selector: 'app-received-offer',
  templateUrl: './received-offer.component.html',
  styleUrls: ['./received-offer.component.css']
})
export class ReceivedOfferComponent implements OnInit {

  user: User;
  offers: Offer[] = [];

  constructor(
    private offerService: OfferService,
    private userStorageService: UserStorageService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.getOffers();
  }

  getOffers() {
    this.offerService.reveivedOffers(this.user).subscribe(
      (res)=>{
        this.offers = res;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  showOffer(id: string) {
    this.router.navigate(['/view-received-offer', id]);
  }

  openRejectOfferDialog(id: string) {
    let dialogReference = this.dialog.open(RejectOfferDialogComponent, {
      data: {offerId: id}
    });

    dialogReference.afterClosed().subscribe(result => {
      this.getOffers();
    });
  }

  openAcceptOfferDialog(offer: Offer) {
    let dialogReference = this.dialog.open(AcceptOfferDialogComponent, {
      data: {offer: offer}
    });

    dialogReference.afterClosed().subscribe(result => {
      this.getOffers();
    });
  }

}
