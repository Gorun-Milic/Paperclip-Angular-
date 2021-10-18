import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/dto/country/country';
import { SearchUser } from 'src/app/dto/user/searchUser';
import { SearchUserParams } from 'src/app/dto/user/searchUserParams';
import { CountryService } from 'src/app/services/country.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  searchUserParam: SearchUserParams = new SearchUserParams('', 'All', 1, 8);

  countries: Country[] = [];

  displayFilters = false;
  
  users = [];
  total = 0;

  constructor(private userService: UserService,
              private router: Router,
              private userStorageService: UserStorageService,
              private countryService: CountryService
              ) { }

  ngOnInit() {
    this.getCountries();
    this.searchUsers();
  }

  getCountries() {
    this.countryService.findCountries().subscribe(
      (res)=>{
        this.countries = res;
      },
      (error)=>{
        console.error(error);
      }
    )
  }

  clickSearch() {
    this.searchUserParam.currentPage = 1;
    this.searchUsers();
  }

  searchUsers() {
    this.userService.pagination1(this.searchUserParam).subscribe(
      (res=>{
        this.users = res.users;
        this.total = res.total;
      })
    );
  }

  previousPage() {
    if (this.searchUserParam.currentPage>1) {
      this.searchUserParam.currentPage -= 1;
      this.searchUsers();
    }
  }

  nextPage() {
    if (this.total> this.searchUserParam.currentPage * this.searchUserParam.pageSize) {
      this.searchUserParam.currentPage += 1;
      this.searchUsers();
    }
  }

  showUser(id: string) {
    if (id===this.userStorageService.getUser().id) {
      this.router.navigate(['my-profile']);
    }else {
      this.router.navigate(['/view-user', id]);
    }
  }

  showFilter() {
    this.displayFilters = !this.displayFilters;
  }

}
