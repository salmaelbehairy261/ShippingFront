import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { branch } from '../models/Branch';
import { EMPTY, catchError } from 'rxjs';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';

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
    return this.apiService.get<branch[]>(this.url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
