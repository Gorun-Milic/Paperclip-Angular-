import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  visible: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  switch() {
    this.visible = !this.visible;
  }

  joinUs() {
    this.router.navigate(['sign-up']);
  }

}
