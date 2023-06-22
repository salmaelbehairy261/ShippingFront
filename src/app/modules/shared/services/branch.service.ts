import { branchResponse, getAllBranch, getBranchById, updateBranch, addBranch } from './../models/Branch';

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { branchList } from '../models/Branch';
import { EMPTY, catchError } from 'rxjs';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { Params } from '../models/Params';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  url='Branch/all'
  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }
  public getBranches(){
    return this.apiService.get<branchList[]>(this.url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }

public getAllBranchs(branchParams:Params){
  const url = `branch`;
  let p = new HttpParams();
    p = p.append('sort', branchParams.sort);
    p = p.append('pageIndex', branchParams.pageNumper);
    p = p.append('pageSize', branchParams.pageSize);
    if(branchParams.search) p=p.append('search',branchParams.search)
    if(branchParams.sort) p=p.append('sort',branchParams.sort)
    return this.apiService.getPagenation<branchResponse>(url,p).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   }

public getBranch(id:number) {
      const url = `Branch/${id}`;
      return this.apiService.get<getBranchById>(url).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
  }

  public updateBranch(updateBranch:updateBranch,Id:number){
    const url = `Branch?id=${Id}`;
    return this.apiService.put<any,updateBranch>(url,updateBranch).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
   
  }
  
  public updateBranchStatus(Id:number){
    const url = `Branch/${Id}`;
   return this.apiService.put<any,any>(url,null).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
    
}

  public addBranch(branch:addBranch ) {
      const url = `Branch`;
     return this.apiService.post<any,addBranch >(url, branch).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
     
  }
  public  delete(Id: number) {
    const url = `Branch?id=${Id}`;
    return this.apiService.delete<void>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }






}
