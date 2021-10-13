import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/dto/offer/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-reject-offer-dialog',
  templateUrl: './reject-offer-dialog.component.html',
  styleUrls: ['./reject-offer-dialog.component.css']
})
export class RejectOfferDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RejectOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {offerId: string},
    private offerService: OfferService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  doNotDelete() {
    this.dialogRef.close({
      rejected: false
    });
  }

  delete() {
    this.offerService.deleteOffer(this.data.offerId).subscribe(
      (res)=>{
        this.toastrService.success('Message', 'You rejected an offer');
        this.dialogRef.close({
          rejected: true
        });
      },
      (err)=>{
        this.toastrService.info("Message", 'Something went wrong');
        this.dialogRef.close({
          rejected: false
        });
      }
    );
  }

}
