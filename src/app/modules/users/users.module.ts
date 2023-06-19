import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RepresentativeComponent } from "./components/Representative/representative.component";
import { MerchantComponent } from "./components/merchant/merchant.component";
import { RepresentativeTableComponent } from "./components/representative-table/representative-table.component";
import { UpdateEmployeeComponent } from "./components/update-employee/update-employee.component";
import { UpdateRepresentativeComponent } from "./components/update-representative/update-representative.component";
import { UsersRoutingModule } from "./users-routing.module";
import { MarchantTableComponent } from "./components/marchant-table/marchant-table.component";
import { UpdateMerchantComponent } from "./components/update-merchant/update-merchant.component";
import { EmployeeTableComponent } from "./components/employee-table/employee-table.component";
import { EmployeeComponent } from "./components/Employee/employee.component";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'



@NgModule({
  declarations: [
    MerchantComponent,
    EmployeeComponent,
    RepresentativeComponent,
    UpdateEmployeeComponent,
    UpdateRepresentativeComponent,
    UpdateMerchantComponent,
    EmployeeTableComponent,
    MarchantTableComponent,
    RepresentativeTableComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule
  ]
})


export class UsersModule { }
