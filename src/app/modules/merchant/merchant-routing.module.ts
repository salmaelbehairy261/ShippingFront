import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { MerchantGuard } from 'src/guards/merchant.guard';
import {DisplayOrderComponent} from '../merchant/components/display-order/display-order.component'

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'orders/:id',component:ShowOrdersComponent},
  {path:'orders/:id/edit/:id',component:EditOrderComponent},
  {path:'new',component:NewOrderComponent},
  {path:'orders/:id/display/:id',component:DisplayOrderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {
  static routes=routes
 }
