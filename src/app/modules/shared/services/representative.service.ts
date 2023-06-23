import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MyToastrService } from './my-toastr.service';
import { addRepresentative, getRepresentative, representativeResponse, updateRepresentative } from '../models/Representative';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Params } from '../models/Params';
import { updatePassword } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {

  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  public GetRepresentatives(representativesParams:Params){
    const url = `Representative`;
    let p = new HttpParams();
      p = p.append('sort', representativesParams.sort);
      p = p.append('pageIndex', representativesParams.pageNumper);
      p = p.append('pageSize', representativesParams.pageSize);
      if(representativesParams.sort) p=p.append('sort',representativesParams.sort)
      if(representativesParams.search) p=p.append('search',representativesParams.search)
      return this.apiService.getPagenation<representativeResponse>(url,p).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
  }

  public GetRepresentative(Eid:any) {
      const url = `Representative/${Eid}`;
      return this.apiService.get<getRepresentative>(url).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
  }

  public UpdateRepresentative(updateRepresentative:updateRepresentative,EId:any){
    const url = `Representative?id=${EId}`;
  return  this.apiService.put<any,updateRepresentative>(url,updateRepresentative).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    
  }


 public UpdateRepresentativePassword(updatePassword:updatePassword,EId:any){
    const url = `Representative/pass?id=${EId}`;
  return  this.apiService.put<any,updatePassword>(url,updatePassword).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    
  }





  public AddRepresentative(representative: addRepresentative) {
      const url = `Representative`;
     return this.apiService.post<any,addRepresentative >(url, representative).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
      
  }
  public  Delete(Id: string) {
    const url = `Representative?id=${Id}`;
    return this.apiService.delete<void>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
