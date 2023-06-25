import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliverToVillageComponent } from './components/deliver-to-village/deliver-to-village.component';
import { ReasonsRefusalTypeComponent } from './components/reasons-refusal-type/reasons-refusal-type.component';
import { ShippingTypeComponent } from './components/shipping-type/shipping-type.component';
import { WeightSettingComponent } from './components/weight-setting/weight-setting.component';
import { AddShippingComponent } from './components/add-shipping/add-shipping.component';
import { AddreasonComponent } from './components/addreason/addreason.component';
import { PermissionGuard } from 'src/guards/permission.guard';

const routes: Routes = [
  {path:'setting/reasons',component:ReasonsRefusalTypeComponent,data:{'permission':10,'action':['Show']},canActivate:[PermissionGuard]},
  {path:'setting/Addreasons',component:AddreasonComponent,data:{'permission':10,'action':['Add']},canActivate:[PermissionGuard]},
  {path:'setting/shipping', component: ShippingTypeComponent,data:{'permission':11,'action':['Show']},canActivate:[PermissionGuard]},
  {path:'setting/Addshipping',component:AddShippingComponent,data:{'permission':11,'action':['Add']},canActivate:[PermissionGuard]},
  {path:'setting/village',component:DeliverToVillageComponent,data:{'permission':12,'action':['Show','Edit']},canActivate:[PermissionGuard]},
  {path:'setting/weight',component:WeightSettingComponent,data:{'permission':13,'action':['Show','Edit']},canActivate:[PermissionGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
  static routes=routes
}
