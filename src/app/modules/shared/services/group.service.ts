import { Injectable } from '@angular/core';
import { Group, group, groupResponse } from '../models/Group';
import { ApiService } from './api.service';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';
import { Params } from '../models/Params';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private genericService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

 public  AddGroup(group: Group) {
      const url = `Group`;
      return this.genericService.post<any,Group >(url, group).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
      
  }


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
  getAllGroups(groupParams: Params){
  const url = 'Group';
    let p = new HttpParams();
  p = p.append('sort', groupParams.sort);
  p = p.append('pageIndex', groupParams.pageNumper);
  p = p.append('pageSize', groupParams.pageSize);
  if(groupParams.search) p=p.append('search',groupParams.search)
  if(groupParams.sort) p=p.append('sort',groupParams.sort)
  return this.genericService.getPagenation<groupResponse>(url,p).pipe(
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
