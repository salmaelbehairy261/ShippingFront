import { AddCity, UpdateCity } from './../models/City';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ErrorMessageService } from './error-message.service';
import { MyToastrService } from './my-toastr.service';
import { EMPTY, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

 
 public getAllCities(id:number){
    const url=`City?id=${id}`
    return this.apiService.get<UpdateCity[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  public addCity(addCity: AddCity) {
    const url='City'
    return this.apiService.post<any,AddCity>(url,addCity).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  public getCity(id:number){
    const url=`City/${id}`
    return this.apiService.get<UpdateCity>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public updateCity(id:number,updateCity:UpdateCity){
    const url=`City/${id}`
    return this.apiService.put<any,UpdateCity>(url,updateCity).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  public deleteCity(id:number){
    const url=`City/${id}`
    return this.apiService.delete<any>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
      
  }
}
