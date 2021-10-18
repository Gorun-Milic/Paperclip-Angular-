import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../dto/city/city';
import { Country } from '../dto/country/country';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  findCities(countryName: string): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:8080/city/' + countryName);
  }

}
