import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'paperclip';
  visible: boolean = true;

  switch() {
    this.visible = !this.visible;
  }
}
