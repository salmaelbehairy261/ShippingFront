import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantRoutingModule } from './modules/merchant/merchant-routing.module';
import { MerchantGuard } from 'src/guards/merchant.guard';
import { LoginRoutingModule } from './modules/login/login-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { RepresentativeRoutingModule } from './modules/representative/representative-routing.module';
import { RepresentativeGuard } from 'src/guards/representative.guard';
import { SettingRoutingModule } from './modules/setting/setting-routing.module';
import { UsersRoutingModule } from './modules/users/users-routing.module';
import { LocationRoutingModule } from './modules/location/location-routing.module';
import { GroupsRoutingModule } from './modules/groups/groups-routing.module';
import { BranchRoutingModule } from './modules/branch/branch-routing.module';
import { OrderReportsRoutingModule } from './modules/order-reports/order-reports-routing.module';
import { EmployeeOrdersRoutingModule } from './modules/employee-orders/employee-orders-routing.module';
import { EmployeeGuard } from 'src/guards/employee.guard';
import { PermissionGuard } from 'src/guards/permission.guard';

const routes: Routes = [
  ...LoginRoutingModule.routes,
  {path:'',component:DashboardComponent,children:[
    {path:'merchant',children:[
      ...MerchantRoutingModule.routes,
    ],canActivate:[MerchantGuard]},
    {path:'representative',children:[
      ...RepresentativeRoutingModule.routes,
    ],canActivate:[RepresentativeGuard]},
    {path:'employee',children:[
      ...LocationRoutingModule.routes,
      ...SettingRoutingModule.routes,
      ...UsersRoutingModule.routes,
      ...GroupsRoutingModule.routes,
      ...BranchRoutingModule.routes,
      ...OrderReportsRoutingModule.routes,
      ...EmployeeOrdersRoutingModule.routes
    ],canActivate:[EmployeeGuard]},
  ],canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
