import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Offer } from 'src/app/dto/offer/offer';
import { OfferService } from 'src/app/services/offer.service';
import { AcceptOfferDialogComponent } from '../accept-offer-dialog/accept-offer-dialog.component';
import { RejectOfferDialogComponent } from '../reject-offer-dialog/reject-offer-dialog.component';

@Component({
  selector: 'app-view-received-offer',
  templateUrl: './view-received-offer.component.html',
  styleUrls: ['./view-received-offer.component.css']
})
export class ViewReceivedOfferComponent implements OnInit {

  offerId: string;
  offer: Offer = new Offer();

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private dialog: MatDialog,
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
        if (this.offer.seen===0) {
          this.viewOffer();
        }
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  viewOffer() {
    this.offerService.viewOffer(this.offer).subscribe(
      (res)=>{
        console.log('Offer updated!');
      },
      (err)=>{
        console.error('Failed to update offer!');
      }
    );
  }

  showProduct(id: string) {
    this.router.navigate(['/view-product', id]);
  }

  openRejectOfferDialog(id: string) {
    let dialogReference = this.dialog.open(RejectOfferDialogComponent, {
      data: {offerId: id}
    });

    dialogReference.afterClosed().subscribe(result => {
      if (result.rejected===true) {
        this.router.navigate(['/received-offer']);
      }
    });
  }

  openAcceptOfferDialog(offer: Offer) {
    let dialogReference = this.dialog.open(AcceptOfferDialogComponent, {
      data: {offer: offer}
    });

    dialogReference.afterClosed().subscribe(result => {
      if (result.accepted==true) {
        this.router.navigate(['received-offer']);
      }
    });
  }

}
