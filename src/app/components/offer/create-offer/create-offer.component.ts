import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductWithPhoto } from 'src/app/dto/product/productWithPhoto';
import { User } from 'src/app/dto/user/user';
import { Offer } from 'src/app/dto/offer/offer';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';
import { OfferService } from 'src/app/services/offer.service';
import { ProductsDialogComponent } from '../products-dialog/products-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  offer: Offer = new Offer();

  user: User;

  displayProduct1 = false;
  product1: ProductWithPhoto;

  displayProduct2 = false;
  product2: ProductWithPhoto;

  userId: string;
  otherUser: User;

  buttonDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private userStorageService: UserStorageService,
    private dialog: MatDialog,
    private offerService: OfferService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('userid');
      this.getUser();
    });

    this.user = this.userStorageService.getUser();
    this.bothSelected();
    
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(
      (res)=>{
        this.otherUser = res;
      },
      (err)=>{
        console.error(err);
      }
    )
  }


  openHisProductsDialog() {
    let dialogRef = this.dialog.open(ProductsDialogComponent, {
      data: {
        user: this.otherUser,
        height: '10rem',
        width: '10rem',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.product) {
        this.product1 = result.product;
        this.displayProduct1 = true;
        this.bothSelected();
      }
    });
  }

  openMyProductsDialog() {
    let dialogReference = this.dialog.open(ProductsDialogComponent, {
      data: {
        user: this.user,
        height: '10rem',
        width: '10rem',
      }
    });

    dialogReference.afterClosed().subscribe(result => {
      if (result.product) {
        this.product2 = result.product;
        this.displayProduct2 = true;
        this.bothSelected();
      }
    });
  }

  bothSelected() {
    if (this.product1 && this.product2) {
      this.buttonDisabled = false;
    }
  }

  sendOffer() {
    this.offer.seen = 0;
    this.offer.sender = this.user;
    this.offer.receiver = this.otherUser;
    this.offer.offeredProduct = this.product2;
    this.offer.receivedProduct = this.product1;

    this.offerService.offerAlreadyExist(this.offer).subscribe(
      (res)=>{
        this.toastrService.error('Error', 'Offer already exist');
      },
      (err)=>{

        this.offerService.sendOffer(this.offer).subscribe(
          (res)=>{
            this.toastrService.success('Success', 'Offer was sent');
            this.showOffer(res.id);
          },
          (err)=>{
            this.toastrService.error('Error', 'Offer was not sent');
            this.offer = new Offer();
            console.error(err);
          }
        );

      }
    );
    
    
  }

  showOffer(id: string) {
    this.router.navigate(['/view-sent-offer', id]);
  }

}
