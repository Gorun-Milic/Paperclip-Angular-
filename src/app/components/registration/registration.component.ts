import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/dto/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Output() onRegister: EventEmitter<any> = new EventEmitter<any>();
  user = new User();
  registrationForm: FormGroup;
  states = ['Algeria', 'Belgium', 'Belarus', 'Brasil', 'Chile', 'Croatia', 'Cyprus', 'Denmark', 'England', 'Finland', 'Ghana', 'Serbia', 'Slovakia', 'Sweden', 'Tunis', 'Wels'];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
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
        ),
        'country': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'zipcode': new FormControl(null, Validators.required),
      }
    );
  }

  // register() {
  //   console.log('sdasdad');
  //   this.userService.register(this.user).subscribe(
  //     (res)=>{console.log('Responce: ' + res)},
  //     (err)=>{console.log('Error: ' + err)}
  //   );
  // }

  register() {
    console.log('sdasdad');
    if (this.registrationForm.valid) {
      this.user = this.registrationForm.value;
      this.userService.register(this.user).subscribe(
        (res)=>{
          alert('Responce: ' + res);
          this.onRegister.emit();
        },
        (err)=>{alert('Error: ' + err)}
      );
    }else {
      alert("Form not valid");
    }
    
  }

}
