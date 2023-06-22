import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderReportsRoutingModule } from './order-reports-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersreportComponent } from './components/ordersreport/ordersreport.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    OrdersreportComponent
  ],
  imports: [
    CommonModule,
    OrderReportsRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class OrderReportsModule { }
