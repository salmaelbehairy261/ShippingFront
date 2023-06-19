import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentativeComponent } from './components/representative/representative.component';

const routes: Routes = [
  {path:'',component:RepresentativeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RepresentativeRoutingModule {
  static routes = routes;
}
