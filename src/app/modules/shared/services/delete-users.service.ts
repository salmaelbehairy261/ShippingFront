import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUsersService {
  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  public  Delete(Id: string) {
    const url = `Account/${Id}`;
    return this.apiService.delete<void>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
