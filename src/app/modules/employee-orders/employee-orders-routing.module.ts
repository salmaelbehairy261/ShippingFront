import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersCountComponent } from './components/orders-count/orders-count.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';

const routes: Routes = [
  {path:'',component:OrdersCountComponent},
  {path:'orders/:id',component:ShowOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeOrdersRoutingModule {
  static routes=routes
}
