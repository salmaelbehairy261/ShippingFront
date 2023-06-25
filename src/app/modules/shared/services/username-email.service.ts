import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { ApiService } from './api.service';
import { ErrorMessageService } from './error-message.service';
import { MyToastrService } from './my-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameEmailService {
  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }
  public isUniqueUserName(userName:string){
    const url=''
    return this.apiService.post<any,string>(url,userName).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public isUniqueEmail(email:string){
    const url=''
    return this.apiService.post<any,string>(url,email).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
