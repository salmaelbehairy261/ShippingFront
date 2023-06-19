import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MyToastrService } from './my-toastr.service';
import { addRepresentative, getRepresentative, representativeResponse, updateRepresentative } from '../models/Representative';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Params } from '../models/Params';

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
    const url = `Account/Representatives`;
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
      const url = `Account/representativeId?representativeId=${Eid}`;
      return this.apiService.get<getRepresentative>(url).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
  }

  public UpdateRepresentative(updateRepresentative:updateRepresentative,EId:any){
    const url = `Account/updateRepresentative?id=${EId}`;
    this.apiService.put<any,updateRepresentative>(url,updateRepresentative).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    ) 
    .subscribe(res => {
      this.toastr.success("تم تعديل المندوب بنجاح")
    });
  }
  public AddRepresentative(representative: addRepresentative) {
      const url = `Account/registerRepresentative`;
      this.apiService.post<any,addRepresentative >(url, representative).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      ) 
      .subscribe(res => {
        this.toastr.success("تم إضافة المندوب بنجاح")
      });
  }
}
