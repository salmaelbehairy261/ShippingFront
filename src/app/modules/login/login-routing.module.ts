import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from 'src/guards/login.guard';

const routes: Routes = [
  {path:"login",component:LoginComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
  static routes=routes
}
