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
import { GroupService } from './group.service';
import { Permissions } from '../models/Group';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Permissions: Permissions[] = []
  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private errorMessageService: ErrorMessageService,
    private toastr: MyToastrService,
    private router: Router,
    private groupService: GroupService,
  ) { }
  secretKey = environment.secretKey
  login(data: loginData) {

    const url = 'Account/login'
    return this.apiService.post<any, loginData>(url, data).pipe(
      catchError(error => {
        const err = this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  handleLogin(res:any){
    const tokenData: any = jwt_decode(res.token.tokenData);
    const token = CryptoJS.AES.encrypt(res.token.tokenData, this.secretKey).toString();
    const name = CryptoJS.AES.encrypt(res.token.name, this.secretKey).toString();
    var gId = res.token.groupId.toString();
    const groupId = CryptoJS.AES.encrypt(gId, this.secretKey).toString();
    const id = CryptoJS.AES.encrypt(tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"], this.secretKey).toString();
    const role = CryptoJS.AES.encrypt(tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], this.secretKey).toString();
    const email = CryptoJS.AES.encrypt(tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"], this.secretKey).toString();
    const exp = new Date(tokenData["exp"] * 1000)
    this.cookieService.set('token', token, exp, undefined, undefined, true, 'Strict');
    this.cookieService.set('user_id', id, exp, undefined, undefined, true, 'Strict');
    this.cookieService.set('user_groupId', groupId, exp, undefined, undefined, true, 'Strict');
    this.cookieService.set('user_role', role, exp, undefined, undefined, true, 'Strict');
    this.cookieService.set('user_name', name, exp, undefined, undefined, true, 'Strict');
    this.cookieService.set('user_email', email, exp, undefined, undefined, true, 'Strict');
    if (this.getUserRole() == 'Merchant')
    {
      this.router.navigate(['/merchant'])
     // window.location.reload()
    }    
    else if (this.getUserRole() == 'Representative')
    {
      this.router.navigate(['/representative'])
     // window.location.reload()
    }
    else if (this.getUserRole() == 'Employee')
    {
      this.router.navigate(['/employee']);
      //window.location.reload()
    }
      
    
  }
  logout() {
    const url = 'Account/logout'
    return this.apiService.post(url, '').pipe(
      catchError(error => {
        const err = this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  getToken() {
    const token = this.cookieService.get('token')
    return CryptoJS.AES.decrypt(token, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  getUserId() {
    const id = this.cookieService.get('user_id')
    return CryptoJS.AES.decrypt(id, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  getUserRole() {
    const role = this.cookieService.get('user_role')
    return CryptoJS.AES.decrypt(role, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  getUserName() {
    const name = this.cookieService.get('user_name')
    return CryptoJS.AES.decrypt(name, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  getUserEmail() {
    const email = this.cookieService.get('user_email')
    return CryptoJS.AES.decrypt(email, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

  getUserGroupId() {
    const groupId = this.cookieService.get('user_groupId')
    return CryptoJS.AES.decrypt(groupId, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
  getPermissions() {

    this.groupService.getGroupById(Number(this.getUserGroupId())).subscribe((response) => {
      response.permissions.forEach((element: any) => {
        const permission: Permissions = {
          id: element.id,
          action: element.action
        }
        this.Permissions.push(permission)
      });

    });
    return this.Permissions
  }


  hasPermission(id: number, action: string) {
    const permission = this.Permissions.find(p => p.id === id && p.action === action);
    return !!permission;
  }


}
