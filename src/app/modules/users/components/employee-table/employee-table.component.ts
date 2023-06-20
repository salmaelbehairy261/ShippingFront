import { NavTitleService } from './../../../shared/services/nav-title.service';
import { OnInit, ElementRef, Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { getAllEmployees, employeeResponse } from "src/app/modules/shared/models/Employee";
import { Params } from "src/app/modules/shared/models/Params";
import { EmployeeService } from "src/app/modules/shared/services/employee.service";




@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  @ViewChild('search') searchTerms?: ElementRef;
  Employees: getAllEmployees[] = [];
  isDesc:boolean=false
  employeeParams = new Params();
  totalCount = 0;
 constructor(
          private employeeService: EmployeeService,
          private router: Router,
          private navTitleService:NavTitleService
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
  
  toggleDelete(employee: getAllEmployees) {
    if (employee.isDeleted) {
      return;
    }

  this.employeeService.Delete(employee.id).subscribe(() => {
    employee.isDeleted = true;
  });
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
}


