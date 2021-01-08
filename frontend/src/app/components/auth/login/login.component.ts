import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Auth from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  loginError: boolean = true;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.nullValidator, Validators.email]),
      'password': new FormControl(null, [Validators.nullValidator, Validators.minLength(6)])
    });


  }

  onSignin() {
    const user_email = this.signinForm.value['email_signin'];
    const user_password = this.signinForm.value['password_signin'];
    const auth = new Auth(user_email, user_password);
    if (!this.authService.signin(auth)) {
      alert("error")
      this.loginError = true;
    } else {
      alert("successfull!")
      //route to chat module
    }

  }

}
