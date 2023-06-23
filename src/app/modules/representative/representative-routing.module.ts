import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentativeComponent } from './components/representative/representative.component';
import { HomeComponent } from './components/home/home.component';
import { DisplayOrderComponent } from './components/display-order/display-order.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'orders/:id',component:RepresentativeComponent},
  {path:'orders/:id/display/:id',component:DisplayOrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RepresentativeRoutingModule {
  static routes = routes;
}
