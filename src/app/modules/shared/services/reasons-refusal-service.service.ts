import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

import { ReasonsRefusalTypeUpdate } from '../models/ReasonsRefusalTypeUpdate';
import { ReasonsRefusalTypeAdd } from '../models/ReasonsRefusalType';
import { EMPTY, catchError } from 'rxjs';
import { ErrorMessageService } from './error-message.service';
import { MyToastrService } from './my-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ReasonsRefusalServiceService {

  constructor(
    private genericService:ApiService ,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
    ) { }
  private baseUrl=environment.baseUrl;

  getAllReasonsRefusalTypes(){
    return this.genericService.get<any>("ReasonsRefusalType/GetAll").pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  getAllReasonsRefusalForRep(){
    return this.genericService.get<any>("ReasonsRefusalType/GetAllForDropDown").pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  getReasonsRefusalTypeById(id:number){
    return this.genericService.get<any>(`ReasonsRefusalType/GetById?ReasonsRefusalTypeId=${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  addReasonsRefusalType(r : ReasonsRefusalTypeAdd ){
    return this.genericService.post<any,ReasonsRefusalTypeAdd>("ReasonsRefusalType",r).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    
  }

  updateReasonsRefusalType(r : ReasonsRefusalTypeUpdate){
    return this.genericService.put<any,ReasonsRefusalTypeUpdate>(`ReasonsRefusalType`,r).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    
  }


  DeleteReasonsRefusalType(id : number){
    return this.genericService.delete<any>(`ReasonsRefusalType?ReasonsRefusalTypeId=${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

}
