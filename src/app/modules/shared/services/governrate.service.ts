import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { governates, governorateWithCities } from '../models/Governorate';
import { MyToastrService } from './my-toastr.service';
import { ErrorMessageService } from './error-message.service';
import { EMPTY, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GovernrateService {
  constructor(
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

  public GetGovernorateWithCityList(){
    const url = `Governorate/allWithCity`;
    return this.apiService.get<governorateWithCities[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
     public GetGovernorates(){
    const url = `Governorate`;
    return this.apiService.get<governates[]>(url).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    )
  }
}
