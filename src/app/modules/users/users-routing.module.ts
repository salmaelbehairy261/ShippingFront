import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepresentativeComponent } from './components/Representative/representative.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { UpdateRepresentativeComponent } from './components/update-representative/update-representative.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { MarchantTableComponent } from './components/marchant-table/marchant-table.component';
import { RepresentativeTableComponent } from './components/representative-table/representative-table.component';
import { UpdateMerchantComponent } from './components/update-merchant/update-merchant.component';
import { EmployeeComponent } from './components/Employee/employee.component';
import { MerchantComponent } from './components/merchant/merchant.component';


const routes: Routes = [
  {path: "users/ShowMerchant", component: MarchantTableComponent },
  {path: "users/AddMerchant", component: MerchantComponent },
  {path: "users/UpdateMerchant/:id", component: UpdateMerchantComponent },

  {path: "users/ShowEmployee", component: EmployeeTableComponent },
  {path: "users/AddEmployee", component: EmployeeComponent },
  {path: "users/UpdateEmployee/:id", component: UpdateEmployeeComponent},

  {path: "users/ShowRepresentative", component: RepresentativeTableComponent},
  {path: "users/AddRepresentative", component: RepresentativeComponent},
  {path: "users/UpdateRepresentative/:id", component:UpdateRepresentativeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
  static routes = routes
 }
