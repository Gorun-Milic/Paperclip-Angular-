import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dto/user/loginDto';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDto = new LoginDto('', '');

  constructor(private userService: UserService, 
              private userStorageService: UserStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginDto).subscribe(
      (res=>{
        localStorage.setItem('jwt-token', res.access_token);
        this.userService.getUserFromJwt().subscribe(
          (res)=>{
            this.userStorageService.saveUser(res);
            this.router.navigate(['my-profile']);
          }
        )
      }),
      (err=>{
        console.error('Error while login!');
      })
    );
  }

}
