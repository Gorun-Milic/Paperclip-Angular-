import { Component, OnInit } from '@angular/core';
import { LoginDto } from 'src/app/dto/user/loginDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDto = new LoginDto('example@email.com', 'examplePassword');

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginDto).subscribe(
      (res=>{
        console.log('Succesfull login!');
      }),
      (err=>{
        console.error('Error while login!');
      })
    );
  }

}
