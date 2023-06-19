import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliverToVillageComponent } from './components/deliver-to-village/deliver-to-village.component';
import { ReasonsRefusalTypeComponent } from './components/reasons-refusal-type/reasons-refusal-type.component';
import { ShippingTypeComponent } from './components/shipping-type/shipping-type.component';
import { WeightSettingComponent } from './components/weight-setting/weight-setting.component';

const routes: Routes = [
  {path:'setting/village',component:DeliverToVillageComponent},
  {path:'setting/reasons',component:ReasonsRefusalTypeComponent},
  {path:'setting/shipping',component:ShippingTypeComponent},
  {path:'setting/weight',component:WeightSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
  static routes=routes
}
