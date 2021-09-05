import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  visible: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  switch() {
    this.visible = !this.visible;
  }

}
