import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Offer } from 'src/app/dto/offer/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-view-sent-offer',
  templateUrl: './view-sent-offer.component.html',
  styleUrls: ['./view-sent-offer.component.css']
})
export class ViewSentOfferComponent implements OnInit {

  offerId: string;
  offer: Offer = new Offer();

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.offerId = params.get('offerid');
      this.getOffer();
    });
  }

  getOffer() {
    this.offerService.getOffer(this.offerId).subscribe(
      (res)=>{
        this.offer = res;
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
