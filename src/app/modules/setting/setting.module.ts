import { shippingType } from './../shared/models/shippingType';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DeliverToVillageComponent } from './components/deliver-to-village/deliver-to-village.component';
import { ReasonsRefusalTypeComponent } from './components/reasons-refusal-type/reasons-refusal-type.component';
import { ShippingTypeComponent } from './components/shipping-type/shipping-type.component';
import { WeightSettingComponent } from './components/weight-setting/weight-setting.component';
import { AddShippingComponent } from './components/add-shipping/add-shipping.component';
import { AddreasonComponent } from './components/addreason/addreason.component';


@NgModule({
  declarations: [
    DeliverToVillageComponent,
    ReasonsRefusalTypeComponent,
    ShippingTypeComponent,
    WeightSettingComponent,
    AddShippingComponent,
    AddreasonComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
