import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { shippingTypeAdd } from '../models/shippingTypeAdd';
import { shippingTypeUpdate } from '../models/shippingTypeUpdate';
import { shippingType } from '../models/shipping-type';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShippingTypeService {

  constructor(
    private genericService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  getAllShippingTypes(){
    return this.genericService.get<any>("ShippingType/all").pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  getShippingTypeById(id:number){
    return this.genericService.get<any>(`ShippingType/${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  addShippingType(s : shippingTypeAdd ){
    return this.genericService.post<any,shippingTypeAdd>("ShippingType",s).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  updateShippingType(s : shippingTypeUpdate){
    return this.genericService.put<any,shippingTypeUpdate>(`ShippingType/${s.id}`,s).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  toggleShippingTypeStatus(id : number){
    return this.genericService.put(`ShippingType/changeState?id=${id}`,null).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  DeleteShippingType(id : number){
    return this.genericService.delete<any>(`ShippingType/${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  public getshippingTypes(){
    return this.genericService.get<shippingType[]>("ShippingType").pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  
}
