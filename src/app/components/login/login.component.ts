import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  loginForm: FormGroup;

  constructor(private userService: UserService, 
              private userStorageService: UserStorageService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {

    this.loginForm = new FormGroup(
      {
        'email': new FormControl(
          null, 
          [
            Validators.required, 
            Validators.email
          ]
        ),
        'password': new FormControl(
          null,
          [
            Validators.required,
            Validators.minLength(8)
          ]
        )
      }
    );

  }

  login() {
    if (this.loginForm.valid) {
      this.loginDto.username = this.loginForm.value.email;
      this.loginDto.password = this.loginForm.value.password;

      console.log(this.loginDto);

      this.userService.login(this.loginDto).subscribe(
        (res=>{
          localStorage.setItem('jwt-token', res.access_token);
          this.userService.getUserFromJwt().subscribe(
            (res)=>{
              this.userStorageService.saveUser(res);
              // this.toastrService.success('Welcome', 'Welcome');
              if (res.role==='admin') {
                this.router.navigate(['statistics-data']);
                this.toastrService.info('Welcome to Admin Page', 'Hello Administrator');
              }else {
                this.router.navigate(['my-profile']);
                this.toastrService.success('Welcome to our website', 'Hello ' + res.firstName);
              }
            }
          )
        }),
        (err=>{
          this.toastrService.error('Wrong Credentials', 'Try again');
          console.error('Error while login!');
        })
      );
    }
    
  }

}
