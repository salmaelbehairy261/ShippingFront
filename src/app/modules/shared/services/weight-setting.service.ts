import { Injectable } from '@angular/core';
import{Weight}from '../models/weight';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WeightSettingService {

  constructor(
    private genericService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  addWeight(body:Weight ){
    return this.genericService.post<any,Weight>(`Weight`,body).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  
  updateWeight(body: Weight) {
    return this.genericService.put<any,Weight>(`Weight`,body).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

  getWeightById(id:number){
    return this.genericService.get<any>(`Weight/${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
