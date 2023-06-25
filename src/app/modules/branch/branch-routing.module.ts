import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './components/branches/branches.component';
import { NewBranchComponent } from './components/new-branch/new-branch.component';
import { PermissionGuard } from 'src/guards/permission.guard';

const routes: Routes = [
  {path : "branch" , component:BranchesComponent,data:{'permission':1,'action':['Show']},canActivate:[PermissionGuard]},
  {path : "addBranch" , component:NewBranchComponent,data:{'permission':1,'action':['Add']},canActivate:[PermissionGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule {
   static routes = routes;
}
