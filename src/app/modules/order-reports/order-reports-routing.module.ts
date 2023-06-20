import { OrdersreportComponent } from './components/ordersreport/ordersreport.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'reports',component:OrdersreportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderReportsRoutingModule {
  static routes=routes
}
