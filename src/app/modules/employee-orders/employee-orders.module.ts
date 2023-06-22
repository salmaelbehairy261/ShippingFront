import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeOrdersRoutingModule } from './employee-orders-routing.module';
import { OrdersCountComponent } from './components/orders-count/orders-count.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import{DisplayOrderComponent} from './components/display-order/display-order.component'


@NgModule({
  declarations: [
    OrdersCountComponent,
    ShowOrdersComponent,
    DisplayOrderComponent
  ],
  imports: [
    CommonModule,
    EmployeeOrdersRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class EmployeeOrdersModule { }
