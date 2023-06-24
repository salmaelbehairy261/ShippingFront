import { governate, governateName, governorateResponse } from './../models/Governorate';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { governates, governorateWithCities } from '../models/Governorate';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';
import { Params } from '../models/Params';
import { HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class GovernrateService {
  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  public GetGovernorateWithCityList(){
    const url = `Governorate/allWithCity`;
    return this.apiService.get<governorateWithCities[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  
  public GetGovernorates() {
    const url = `Governorate`;
    return this.apiService.get<governates[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  public GetAllGovernorates(govParams:Params){
    const url = `Governorate/all`;
  let p = new HttpParams();
    p = p.append('sort', govParams.sort);
    p = p.append('pageIndex', govParams.pageNumper);
    p = p.append('pageSize', govParams.pageSize);
    if(govParams.search) p=p.append('search',govParams.search)
    if(govParams.sort) p=p.append('sort',govParams.sort)
    return this.apiService.getPagenation<governorateResponse>(url,p).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  public AddGovernorate(governate: governateName) {
    const url='Governorate'
    return this.apiService.post<any,governateName>(url,governate).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public UpdateGovernorate(governate:governate,gId:number){
    const url=`Governorate/${gId}`
    return this.apiService.put<any,governate>(url,governate).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public DeleteGovernorate(id:any){
    const url=`Governorate?id=${id}`
    return this.apiService.delete<any>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
