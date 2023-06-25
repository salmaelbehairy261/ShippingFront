import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginData } from '../../../shared/models/Login';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isValid=true
  errorMessageService: any;
  toastr: any;
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
    this.authService.login(data).subscribe(res=>{
      if(res['message']=="Invalid")
        this.isValid=false
      else{
        this.isValid=true
        this.authService.handleLogin(res)
      }
    })
  }
}
