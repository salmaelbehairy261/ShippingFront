import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { GovernorateComponent } from './components/governorate/governorate.component';

const routes: Routes = [
  {path:'location/city',component:CityComponent},
  {path:'location/governorates',component:GovernorateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
  static routes=routes
}
