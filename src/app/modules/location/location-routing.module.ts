import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { GovernorateComponent } from './components/governorate/governorate.component';
import { NewGovernorateComponent } from './components/new-governorate/new-governorate.component';
import { NewCityComponent } from './components/new-city/new-city.component';
import { PermissionGuard } from 'src/guards/permission.guard';

const routes: Routes = [
  {path:'location/city',component:CityComponent,data:{'permission':2,'action':['Show']},canActivate:[PermissionGuard]},
  {path:'location/addcity',component:NewCityComponent,data:{'permission':2,'action':['Add']},canActivate:[PermissionGuard]},
  {path:'location/governorates',component:GovernorateComponent,data:{'permission':3,'action':['Show']},canActivate:[PermissionGuard]},
  {path:'location/addgovernorate',component:NewGovernorateComponent,data:{'permission':3,'action':['Add']},canActivate:[PermissionGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
  static routes=routes
}
