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
import { PermissionGuard } from 'src/guards/permission.guard';


const routes: Routes = [
  {path: "users/ShowMerchant", component: MarchantTableComponent,data:{'permission':6,'action':['Show']},canActivate:[PermissionGuard]},
  {path: "users/AddMerchant", component: MerchantComponent,data:{'permission':6,'action':['Add']}},
  {path: "users/UpdateMerchant/:id", component: UpdateMerchantComponent,data:{'permission':6,'action':['Edit']}},

  {path: "users/ShowEmployee", component: EmployeeTableComponent,data:{'permission':4,'action':['Show']},canActivate:[PermissionGuard]},
  {path: "users/AddEmployee", component: EmployeeComponent,data:{'permission':4,'action':['Add']}},
  {path: "users/UpdateEmployee/:id", component: UpdateEmployeeComponent,data:{'permission':4,'action':['Edit']}},

  {path: "users/ShowRepresentative", component: RepresentativeTableComponent,data:{'permission':5,'action':['Show']}},
  {path: "users/AddRepresentative", component: RepresentativeComponent,data:{'permission':5,'action':['Add']}},
  {path: "users/UpdateRepresentative/:id", component:UpdateRepresentativeComponent,data:{'permission':5,'action':['Edit']}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
  static routes = routes
 }
