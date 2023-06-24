import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { GovernorateComponent } from './components/governorate/governorate.component';
import { NewGovernorateComponent } from './components/new-governorate/new-governorate.component';
import { NewCityComponent } from './components/new-city/new-city.component';

const routes: Routes = [
  {path:'location/city',component:CityComponent},
  {path:'location/addcity',component:NewCityComponent},
  {path:'location/governorates',component:GovernorateComponent},
  {path:'location/addgovernorate',component:NewGovernorateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
  static routes=routes
}
