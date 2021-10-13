import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/dto/offer/offer';
import { User } from 'src/app/dto/user/user';
import { OfferService } from 'src/app/services/offer.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-sent-offer',
  templateUrl: './sent-offer.component.html',
  styleUrls: ['./sent-offer.component.css']
})
export class SentOfferComponent implements OnInit {

  user: User;
  offers: Offer[];

  constructor(
    private offerService: OfferService,
    private userStorageService: UserStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userStorageService.getUser();
    this.getOffers();
  }

  getOffers() {
    this.offerService.sentOffers(this.user).subscribe(
      (res)=>{
        this.offers = res;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  showOffer(id: string) {
    this.router.navigate(['/view-sent-offer', id]);
  }

}
