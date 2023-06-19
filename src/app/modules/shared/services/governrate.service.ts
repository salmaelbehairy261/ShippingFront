import { governate, governateName } from './../models/Governorate';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { governates, governorateWithCities, governorateWithCity } from '../models/Governorate';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';


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
  public GetGovernorateWithCitiesList(){
    const url = `Governorate/allCitiesWithGovernorate`;
    return this.apiService.get<governorateWithCity[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public GetGovernorates(){
    const url = `Governorate/all`;
    return this.apiService.get<governates[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public AddGovernorate(governate:governateName){
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
