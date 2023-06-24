import { NavTitleService } from './../../../shared/services/nav-title.service';
import { OnInit, ElementRef, Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { getAllEmployees, employeeResponse } from "src/app/modules/shared/models/Employee";
import { Params } from "src/app/modules/shared/models/Params";
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { EmployeeService } from "src/app/modules/shared/services/employee.service";




@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  @ViewChild('search') searchTerms?: ElementRef;
  @ViewChild('deleteModal') deleteModal: BsModalRef | undefined;
  Employees: getAllEmployees[] = [];
  isDesc:boolean=false
  employeeParams = new Params();
  totalCount = 0;
  selectedEmployee: getAllEmployees | null = null;
 
  
 constructor(
          private employeeService: EmployeeService,
          private router: Router,
          private navTitleService: NavTitleService,
          private authService:AuthService,
) {}

  ngOnInit(): void {
    this.navTitleService.title.next('الموظفين')
    this.loadEmployees();

  }

 loadEmployees() {
  this.employeeService.GetEmployees(this.employeeParams)
  .subscribe((response:employeeResponse) => {
    this.Employees = response.data;
    this.employeeParams.pageNumper = response.pageIndex;
    this.employeeParams.pageSize = response.pageSize;
    this.totalCount=response.pageCount
  });
}

 
 editEmployee(employeeId: string) {

  this.router.navigate(['/employee/users/UpdateEmployee', employeeId]);
  }
  addEmployee() {

    this.router.navigate(['/employee/users/AddEmployee']);
  }
  
  toggleDelete() {
    if (this.selectedEmployee) {
      const emp = this.selectedEmployee;
      if (emp.isDeleted) {
        return;
      }

      this.employeeService.Delete(emp.id).subscribe(() => {
        emp.isDeleted = true;
        this.deleteModal!.hide();
      });
    }
  }
   hasPermission(action: string)
  {
    return this.authService.hasPermission(4,action);
  }  

  onPageChanged(event: any)
  {
    if (this.employeeParams.pageNumper !== event.page)
    {
      this.employeeParams.pageNumper = event.page;
      this.loadEmployees();

      }
  }

  onSearch() {
    this.employeeParams.search = this.searchTerms?.nativeElement.value;
    this.employeeParams.pageNumper = 1;
    this.loadEmployees();
  }
  onReset() {
    if (this.searchTerms)
      this.searchTerms.nativeElement.value = ""
    this.employeeParams = new Params();
    this.loadEmployees();
  }
  onSort(){
    this.isDesc=!this.isDesc;
    this.employeeParams.sort=this.isDesc?'Desc':''
    this.loadEmployees();
  }
  onPageSizeChange(event:any){
    const pageSize=parseInt(event.target.value)
    if (pageSize > 0 && pageSize < 50){
      this.employeeParams.pageSize=pageSize
      this.loadEmployees()
    }
  }

  refresh() {
    

  }
}


