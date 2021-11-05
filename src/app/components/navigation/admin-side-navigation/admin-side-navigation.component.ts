import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-side-navigation',
  templateUrl: './admin-side-navigation.component.html',
  styleUrls: ['./admin-side-navigation.component.css']
})
export class AdminSideNavigationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('user_key');
    localStorage.removeItem('jwt-token');
    this.router.navigate(['home']);
  }

}
