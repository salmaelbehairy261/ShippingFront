import { addEmployee, employeeResponse, getEmployee, updateEmployee } from '../models/Employee';
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
      const url = `Account/employeeId?employeeId=${Eid}`;
      return this.apiService.get<getEmployee>(url).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      );
  }

 public AddEmployee(employee: addEmployee ) {
      const url = `Account/registerEmployee`;
      this.apiService.post<any,addEmployee >(url, employee).pipe(
        catchError(error => {
          const err=this.errorMessageService.getServerErrorMessage(error);
          this.toastr.error(err);
          return EMPTY;
        })
      ) 
      .subscribe(res => {
        this.toastr.success("تم إضافة الموظف بنجاح")
      });
  } 

public UpdateEmployee(updateEmployee:updateEmployee,EId:any){
    const url = `Account/updateEmployee?id=${EId}`;
    this.apiService.put<any,updateEmployee>(url,updateEmployee).pipe(
      catchError(error => {
        const err=this.errorMessageService.getServerErrorMessage(error);
        this.toastr.error(err);
        return EMPTY;
      })
    ) 
    .subscribe(res => {
      this.toastr.success("تم تعديل الموظف بنجاح")
    });
}
  
public GetEmployees(employeeParams:Params){
  const url = `Account/Employees`;
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


}
