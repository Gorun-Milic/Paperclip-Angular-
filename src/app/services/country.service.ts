import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../dto/country/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  findCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:8080/country');
  }
}
