import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { DeliverToVillage } from '../models/deliverToVillage';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverToVillageService {

  constructor(
    private genericService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  addDeliverToVillage(body:DeliverToVillage ){
    return this.genericService.post<any,DeliverToVillage>(`DeliverToVillage`,body).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  updateDeliverToVillage(body:DeliverToVillage){
    return this.genericService.put<any,DeliverToVillage>(`DeliverToVillage`,body).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
  getDeliverToVillageById(id:number){
    return this.genericService.get<any>(`DeliverToVillage/${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
