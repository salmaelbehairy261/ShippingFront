import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersCountComponent } from './components/orders-count/orders-count.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { DisplayOrderComponent } from './components/display-order/display-order.component';
import { PermissionGuard } from 'src/guards/permission.guard';

const routes: Routes = [
  {path:'',component:OrdersCountComponent},
  {path:'orders/:id',component:ShowOrdersComponent,data:{'permission':7,'action':['Show']},canActivate:[PermissionGuard]},
  {path:'orders/:id/display/:id',component:DisplayOrderComponent,data:{'permission':7,'action':['Show']},canActivate:[PermissionGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeOrdersRoutingModule {
  static routes=routes
}
