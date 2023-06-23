import { addEmployee, employeeResponse, getEmployee, updateEmployee, updatePassword } from '../models/Employee';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MyToastrService } from './my-toastr.service';
import { EMPTY, catchError } from 'rxjs';
import { ErrorMessageService } from './error-message.service';
import { HttpParams } from '@angular/common/http';
import { Params } from '../models/Params';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
  
    private apiService:ApiService,
    private toastr:MyToastrService,
    private errorMessageService:ErrorMessageService
  ) { }

public GetُEmployee(Eid:any) {
      const url = `Employee/${Eid}`;
      return this.apiService.get<getEmployee>(url).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      );
  }

 public AddEmployee(employee: addEmployee ) {
      const url = `Employee`;
     return this.apiService.post<any,addEmployee >(url, employee).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      )
      
  }

public UpdateEmployee(updateEmployee:updateEmployee,EId:any){
    const url = `Employee?id=${EId}`;
   return this.apiService.put<any,updateEmployee>(url,updateEmployee).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    ) 
  }
  

  public UpdateEmployeePassword(updatePassword:updatePassword,EId:any){
    const url = `Employee/pass?id=${EId}`;
   return this.apiService.put<any,updatePassword>(url,updatePassword).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    ) 
}






public GetEmployees(employeeParams:Params){
  const url = `Employee`;
  let p = new HttpParams();
  p = p.append('sort', employeeParams.sort);
  p = p.append('pageIndex', employeeParams.pageNumper);
  p = p.append('pageSize', employeeParams.pageSize);
  if(employeeParams.search) p=p.append('search',employeeParams.search)
  if(employeeParams.sort) p=p.append('sort',employeeParams.sort)
  return this.apiService.getPagenation<employeeResponse>(url,p).pipe(
    catchError(error => {
      const err=this.errorMessageService.getServerErrorMessage(error);
      this.toastr.error(err);
      return EMPTY;
    })
  )
 }
 public  Delete(Id: string) {
  const url = `Employee?id=${Id}`;
  return this.apiService.delete<void>(url).pipe(
    catchError(error => {
      const err=this.errorMessageService.getServerErrorMessage(error);
      this.toastr.error(err);
      return EMPTY;
    })
  )
}

}
