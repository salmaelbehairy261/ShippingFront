import { OrdersreportComponent } from './components/ordersreport/ordersreport.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/guards/permission.guard';

const routes: Routes = [
  {path:'reports',component:OrdersreportComponent,data:{'permission':8,'action':['Show']},canActivate:[PermissionGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderReportsRoutingModule {
  static routes=routes
}
