import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/dto/offer/offer';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-accept-offer-dialog',
  templateUrl: './accept-offer-dialog.component.html',
  styleUrls: ['./accept-offer-dialog.component.css']
})
export class AcceptOfferDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AcceptOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {offer: Offer},
    private exchangeService: ExchangeService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  onClose(text: string) {
    this.dialogRef.close({
      answer: text
    });
  }

  acceptOffer() {
    this.doAllOperations(this.data.offer);
  }

  acceptAndCloseDialog() {
    // this.dialogRef.close();
    this.dialogRef.close({
      accepted: true
    });
  }

  rejectAndCloseDialog() {
    this.dialogRef.close({
      accepted: false
    });
  }

  
  doAllOperations(offer: Offer) {
    this.exchangeService.deleteLikes(offer).subscribe(
      (res)=>{
        this.exchangeService.deleteComments(offer).subscribe(
          (res)=>{
            this.exchangeService.deleteSaves(offer).subscribe(
              (res)=>{
                this.exchangeService.exchangeProducts(offer).subscribe(
                  (res)=>{
                    this.exchangeService.deleteOffers(offer).subscribe(
                      (res)=>{
                        this.toastrService.success('Success', 'You accepted an offer');
                        this.acceptAndCloseDialog();
                        // this.router.navigate(['received-offer']);
                      },
                      (err)=>{
                        this.toastrService.error('Error', 'Unable to accept this offer');
                        this.rejectAndCloseDialog();
                        // this.router.navigate(['received-offer']);
                      }
                    )
                  },
                  (err)=>{
                    this.toastrService.error('Error', 'Unable to accept this offer');
                    this.rejectAndCloseDialog();
                    // this.router.navigate(['received-offer']);
                  }
                )
              },
              (err)=>{
                this.toastrService.error('Error', 'Unable to accept this offer');
                this.rejectAndCloseDialog();
                // this.router.navigate(['received-offer']);
              }
            );
          },
          (err)=>{
            this.toastrService.error('Error', 'Unable to accept this offer');
            this.rejectAndCloseDialog();
            // this.router.navigate(['received-offer']);
          }
        )
      },
      (err)=>{
        this.toastrService.error('Error', 'Unable to accept this offer');
        this.rejectAndCloseDialog();
        // this.router.navigate(['received-offer']);
      }
    )
  }

}
