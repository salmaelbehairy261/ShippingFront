import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { CityComponent } from './components/city/city.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CityComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule
  ]
})
export class LocationModule { }
