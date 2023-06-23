import { addMerchant, getMerchant, merchantResponse, updateMerchant } from '../models/Merchant';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Params } from '../models/Params';
import { updatePassword } from '../models/Employee';
@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }


public GetMerchants(merchantParams:Params){
  const url = `Merchant`;
  let p = new HttpParams();
    p = p.append('sort', merchantParams.sort);
    p = p.append('pageIndex', merchantParams.pageNumper);
    p = p.append('pageSize', merchantParams.pageSize);
    if(merchantParams.search) p=p.append('search',merchantParams.search)
    if(merchantParams.sort) p=p.append('sort',merchantParams.sort)
    return this.apiService.getPagenation<merchantResponse>(url,p).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   }


public GetMerchant(Eid:any) {
      const url = `Merchant/${Eid}`;
      return this.apiService.get<getMerchant>(url).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
  }

  public UpdateMerchant(updateMerchant:updateMerchant,EId:any){
    const url = `Merchant?id=${EId}`;
  return  this.apiService.put<any,updateMerchant>(url,updateMerchant).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   
}

 public UpdateMerchantPassword(updatePassword:updatePassword,EId:any){
  
    const url = `Merchant/pass?id=${EId}`;
  return  this.apiService.put<any,updatePassword>(url,updatePassword).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   
}

  
  
  
  public AddMerchant(merchant:addMerchant ) {
      const url = `Merchant`;
     return this.apiService.post<any,addMerchant >(url, merchant).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
     
  }
  public  Delete(Id: string) {
    const url = `Merchant?id=${Id}`;
    return this.apiService.delete<void>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
