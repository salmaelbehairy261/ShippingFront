import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginData } from '../../../shared/models/Login';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService:AuthService,
    private router:Router){}
  showPassword=false
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })
  login(){
    const data:loginData={
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    this.authService.login(data)
  }
}
