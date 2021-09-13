import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchUser } from 'src/app/dto/user/searchUser';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  searchUser: SearchUser = new SearchUser('', '', '', 1, 16);
  countries = ['Algeria', 'Belgium', 'Belarus', 'Brasil', 'Chile', 'Croatia', 'Cyprus', 'Denmark', 'England', 'Finland', 'Ghana', 'Serbia', 'Slovakia', 'Sweden', 'Tunis', 'Wels'];

  users = [];
  total = 0;

  constructor(private userService: UserService,
              private router: Router,
              private userStorageService: UserStorageService) { }

  ngOnInit() {
    this.searchUser.name = '';
    this.searchUser.country = '';
    this.searchUser.city = '';

    this.searchUsers();
  }

  searchUsers() {
    this.userService.pagination(this.searchUser).subscribe(
      (res=>{
        this.users = res.users;
        this.total = res.total;
      })
    );
  }

  previousPage() {
    if (this.searchUser.currentPage>1) {
      this.searchUser.currentPage -= 1;
      this.searchUsers();
    }
  }

  nextPage() {
    if (this.total> this.searchUser.currentPage * this.searchUser.pageSize) {
      this.searchUser.currentPage += 1;
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

}
