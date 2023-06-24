import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { CityComponent } from './components/city/city.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GovernorateComponent } from './components/governorate/governorate.component';
import { NewCityComponent } from './components/new-city/new-city.component';
import { NewGovernorateComponent } from './components/new-governorate/new-governorate.component';


@NgModule({
  declarations: [
    CityComponent,
    GovernorateComponent,
    NewCityComponent,
    NewGovernorateComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule,
  ],
  providers:[
    NgbActiveModal,
  ]
})
export class LocationModule { }
