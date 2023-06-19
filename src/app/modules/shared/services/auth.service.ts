import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { loginData } from '../models/Login';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, catchError } from 'rxjs';
import { ErrorMessageService } from './error-message.service';
import { MyToastrService } from './my-toastr.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService:ApiService,
    private cookieService:CookieService,
    private errorMessageService:ErrorMessageService,
    private toastr:MyToastrService,
    private router:Router
  ) { }
  secretKey=environment.secretKey
  login(data:loginData){
    const url='Account/login'
    return this.apiService.post<any,loginData>(url,data).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    .subscribe(res=>{
      const tokenData:any=jwt_decode(res.token)
      const token = CryptoJS.AES.encrypt(res.token, this.secretKey).toString();
      const id=CryptoJS.AES.encrypt(tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"], this.secretKey).toString();
      const role=CryptoJS.AES.encrypt(tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], this.secretKey).toString();
      const exp=new Date(tokenData["exp"]* 1000)
      this.cookieService.set('token',token, exp, undefined, undefined, true, 'Strict');
      this.cookieService.set('user_id',id, exp, undefined, undefined, true, 'Strict');
      this.cookieService.set('user_role',role, exp, undefined, undefined, true, 'Strict');
      if(this.getUserRole()=='Merchant')
        this.router.navigate(['/merchant'])
      })
  }
  logout(){
    const url='Account/logout'
    this.apiService.post(url,'').pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    .subscribe(res=>{
      this.cookieService.deleteAll()
    })
  }
  getToken() {
    const token=this.cookieService.get('token')
    return CryptoJS.AES.decrypt(token, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  getUserId() {
    const id =this.cookieService.get('user_id')
    return CryptoJS.AES.decrypt(id, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  getUserRole() {
    const role=this.cookieService.get('user_role')
    return CryptoJS.AES.decrypt(role, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  isAuthenticated() {
    return this.cookieService.get('token') != null;
  }
  
}
