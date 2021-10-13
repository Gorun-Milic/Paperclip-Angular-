import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../dto/offer/offer';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient
  ) { }

  getOffer(id: string): Observable<Offer> {
    return this.http.get<Offer>('http://localhost:8080/offer/' + id);
  }

  sendOffer(offer: Offer): Observable<Offer>{
    return this.http.post<Offer>('http://localhost:8080/offer/add', offer);
  }

  sentOffers(user: User): Observable<Offer[]>{
    return this.http.post<Offer[]>('http://localhost:8080/offer/sentOffers', user);
  }

  reveivedOffers(user: User): Observable<Offer[]>{
    return this.http.post<Offer[]>('http://localhost:8080/offer/reveivedOffers', user);
  }

  offerAlreadyExist(offer: Offer): Observable<any> {
    return this.http.post<Offer>('http://localhost:8080/offer/offerAlreadyExist', offer);
  }

  countNewOffers(user: User): Observable<number>{
    return this.http.post<number>('http://localhost:8080/offer/countNewOffers', user);
  }

  viewOffer(offer: Offer): Observable<any> {
    return this.http.put<any>('http://localhost:8080/offer/viewOffer', offer);
  }

  deleteOffer(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/offer/' + id);
  }

}
