import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantRoutingModule } from './modules/merchant/merchant-routing.module';
import { MerchantGuard } from 'src/guards/merchant.guard';
import { LoginRoutingModule } from './modules/login/login-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  ...LoginRoutingModule.routes,
  {path:'',component:DashboardComponent,children:[
    {path:'merchant',children:[
      ...MerchantRoutingModule.routes,
    ],canActivate:[MerchantGuard]},
  ],canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
