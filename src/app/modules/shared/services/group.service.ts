import { Injectable } from '@angular/core';
import { group } from '../models/Group';
import { ApiService } from './api.service';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private genericService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  public GetGroups(){
    const url = `Group/all`;
    return this.genericService.get<group[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   }
   getAllGroups(){
     return this.genericService.get<any>("Group").pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   }
   deleteGroup(id:number){
     return this.genericService.delete<any>(`Group/${id}`).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   }
}
