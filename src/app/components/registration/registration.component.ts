import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/dto/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User('', 'John', 'Joe', 'john@email.com', 'john2211', 'Serbia', 'Belgrade', '2100');

  states = ['Algeria', 'Belgium', 'Belarus', 'Brasil', 'Chile', 'Croatia', 'Cyprus', 'Denmark', 'England', 'Finland', 'Ghana', 'Serbia', 'Slovakia', 'Sweden', 'Tunis', 'Wels'];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    console.log('sdasdad');
    this.userService.register(this.user).subscribe(
      (res)=>{console.log('Responce: ' + res)},
      (err)=>{console.log('Error: ' + err)}
    );
  }

}
