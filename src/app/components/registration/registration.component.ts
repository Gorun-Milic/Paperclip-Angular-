import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/dto/city/city';
import { Country } from 'src/app/dto/country/country';
import { User } from 'src/app/dto/user/user';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Output() onRegister: EventEmitter<any> = new EventEmitter<any>();
  user = new User();
  countries: Country[] = [];
  cities: City[] = [];

  selectedCountry = new Country();
  selectedCity = new City();

  constructor(
    private userService: UserService,
    private countryService: CountryService,
    private cityService: CityService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.getCountries();
  }

  reg(regForm: NgForm) {
    if(regForm.valid) {
      this.initalizeUser(regForm.value);
      this.userService.register(this.user).subscribe(
        (res)=>{
          this.toastrService.success("Successful registration", "Thanks for joining us");
          this.onRegister.emit();
        },
        (err)=>{
          this.toastrService.error("Unsuccessful registration", "Try again");
        }
      )
    }
  }

  initalizeUser(formValue) {
    this.user.firstName = formValue.firstName;
    this.user.lastName = formValue.lastName;
    this.user.email = formValue.email;
    this.user.password = formValue.password;
    this.user.city = formValue.city;
    this.user.zipcode = formValue.zipcode;
  }

  getCountries() {
    this.countryService.findCountries().subscribe(
      (res)=>{
        this.countries = res;
        this.selectedCountry = this.countries[0]; 
        this.getCities(this.countries[0].name);
      },
      (err)=>{
        console.error(err);
      }
    )
  }

  onChange() {
    this.getCities(this.selectedCountry.name);
  }

  getCities(countryName: string) {
    this.cityService.findCities(countryName).subscribe(
      (res)=>{
        this.cities = res;
        this.selectedCity = this.cities[0];
      },
      (err)=>{
        console.error(err);
      }
    );
  }

}
