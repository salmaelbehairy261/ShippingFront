import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { DisplayOrderComponent } from './components/display-order/display-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component'

@NgModule({
  declarations: [
    HomeComponent,
    ShowOrdersComponent,
    NewOrderComponent,
    EditOrderComponent,
    DisplayOrderComponent,
    OrderConfirmationComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class MerchantModule { }
