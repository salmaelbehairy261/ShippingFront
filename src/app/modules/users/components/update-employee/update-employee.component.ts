import { group } from '../../../shared/models/Group';
import { getEmployee, updateEmployee } from '../../../shared/models/Employee';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../shared/services/employee.service';
import { BranchService } from 'src/app/modules/shared/services/branch.service';
import { GroupService } from 'src/app/modules/shared/services/group.service';
import { ActivatedRoute } from '@angular/router';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { branchList } from 'src/app/modules/shared/models/Branch';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{

updateEmployeeForm: FormGroup = new FormGroup({});
  personalInfo=true
  jobInfo=false
  groups: group[] = [];
  branches:branchList[] = [];
  employee: getEmployee|null =null;
  employeeId: string='';
  constructor(
    private toaster:MyToastrService ,
    private location:Location,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private groupService: GroupService,
    private branchService:BranchService,
    private formBuilder: FormBuilder,
    private navTitleService:NavTitleService
  ) {}


  ngOnInit(): void {
    this.navTitleService.title.next('تعديل موظف')
    this.formBuilde();
    this.loadBranches();
    this.loadGroups();
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.loadEmployee(this.employeeId);
    });
  }
  showInfo(step:number){
    this.personalInfo=step==1
    this.jobInfo=step==3
  }
  formBuilde() {
    this.updateEmployeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: ['', Validators.required],
      branchId: ['', Validators.required],
      groupId: ['', Validators.required],
    });
  }

  loadBranches() {
    this.branchService.getBranches().subscribe((response) => {
      this.branches = response;
    });
  }
  loadEmployee(employeeId:any)
  {
    this.employeeService.GetُEmployee(employeeId).subscribe((response) => {
      this.employee = response;
      console.log(this.employee.branchId);
      this.updateEmployeeForm.patchValue({
        name: this.employee.name,
        address: this.employee.address,
        phoneNumber:this.employee.phoneNumber,
        branchId: this.employee.branchId,
        groupId :this.employee.groupId
      });

    })
  }

  loadGroups() {
    this.groupService.GetGroups().subscribe((response) => {
      this.groups = response;
    });
  }

  onSubmit() {

    if (this.updateEmployeeForm.invalid) {
      return;
    }

  const updateEmployeeData: updateEmployee = {
    id:this.employeeId,
      name: this.updateEmployeeForm.value.name,
      phoneNumber: this.updateEmployeeForm.value.phoneNumber,
      address: this.updateEmployeeForm.value.address,
      branchId: this.updateEmployeeForm.value.branchId as number,
      groupId: this.updateEmployeeForm.value.groupId as number,

    };
     console.log(updateEmployeeData);
    this.employeeService.UpdateEmployee(updateEmployeeData,this.employeeId).subscribe(res => {
    this.toaster.success("تم تعديل الموظف بنجاح");
    this.location.back();
    });;

  }

}
