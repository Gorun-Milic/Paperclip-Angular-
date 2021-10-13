import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from '../dto/offer/offer';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private deleteLikesHost = "http://localhost:8080/likes/deleteLikes";
  private deleteCommentsHost = "http://localhost:8080/comment/deleteComments";
  private exchangeProductsHost = "http://localhost:8080/product/exchange";
  private deleteOffersHost = "http://localhost:8080/offer/deleteOffers";
  private deleteSavesHost = "http://localhost:8080/save/deleteSaves";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  deleteLikes(offer: Offer): Observable<any> {
    return this.http.post<any>(this.deleteLikesHost, offer);
  }

  deleteComments(offer: Offer): Observable<any> {
    return this.http.post<any>(this.deleteCommentsHost, offer);
  }

  deleteSaves(offer: Offer): Observable<any> {
    return this.http.post<any>(this.deleteSavesHost, offer);
  }

  exchangeProducts(offer: Offer): Observable<any> {
    return this.http.post<any>(this.exchangeProductsHost, offer);
  }

  deleteOffers(offer: Offer): Observable<any> {
    return this.http.post<any>(this.deleteOffersHost, offer);
  }

  acceptOffer(offer: Offer) {
    this.deleteLikes(offer).subscribe(
      (res)=>{
        this.deleteComments(offer).subscribe(
          (res)=>{
            this.deleteSaves(offer).subscribe(
              (res)=>{
                this.exchangeProducts(offer).subscribe(
                  (res)=>{
                    this.deleteOffers(offer).subscribe(
                      (res)=>{
                        alert("Uspelo")
                        this.router.navigate(['received-offer'])
                      },
                      (err)=>{
                        alert("Kiksnuo kod deleteOffer")
                      }
                    )
                  },
                  (err)=>{
                    alert("Kiksnuo kod exchangeProducts")
                  }
                )
              },
              (err)=>{
                alert("Kiksnuo kod deleteSaves");
              }
            );
          },
          (err)=>{
            alert("Kiksnuo kod deleteComments")
          }
        )
      },
      (err)=>{
        alert("Kiksnuo kod deleteLikes")
      }
    )
  }


}
