import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { branchList } from "src/app/modules/shared/models/Branch";
import { addEmployee } from "src/app/modules/shared/models/Employee";
import { group } from "src/app/modules/shared/models/Group";
import { BranchService } from "src/app/modules/shared/services/branch.service";
import { EmployeeService } from "src/app/modules/shared/services/employee.service";
import { GroupService } from "src/app/modules/shared/services/group.service";
import { MyToastrService } from "src/app/modules/shared/services/my-toastr.service";
import { NavTitleService } from "src/app/modules/shared/services/nav-title.service";



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
userInfo=false
personalInfo=true
jobInfo=false
employeeForm: FormGroup = new FormGroup({});

  groups: group[] = [];
  branches:branchList[] = [];

  constructor(private toaster:MyToastrService ,
    private location:Location,
    private employeeService: EmployeeService,
    private groupService: GroupService,
    private branchService:BranchService,
    private formBuilder: FormBuilder,
    private navTitleService:NavTitleService
  ) {}


  ngOnInit(): void {
    this.navTitleService.title.next('اضافة موظف')
    this.formBuilde();
    this.loadBranches();
    this.loadGroups();
  }
  showInfo(step:number){
    this.personalInfo=step==1
    this.userInfo=step==2
    this.jobInfo=step==3
  }
  formBuilde() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: ['', Validators.required],
      branch: ['', Validators.required],
      group: ['', Validators.required],


    });
  }

  loadBranches() {
    this.branchService.getBranches().subscribe((response) => {
      this.branches = response;
    });
  }

  loadGroups() {
    this.groupService.GetGroups().subscribe((response) => {
      this.groups = response;
    });
  }
onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData: addEmployee = {
      name: this.employeeForm.value.name,
      userName: this.employeeForm.value.userName,
      email: this.employeeForm.value.email,
      password: this.employeeForm.value.password,
      phoneNumber: this.employeeForm.value.phoneNumber,
      address: this.employeeForm.value.address,
      branchId: this.employeeForm.value.branch as number,
      groupId: this.employeeForm.value.group as number,

    };
  console.log(employeeData);
  this.employeeService.AddEmployee(employeeData).subscribe(res => {
    this.toaster.success("تم إضافة الموظف بنجاح");
     this.location.back();
      });

  }

}
