import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './components/branches/branches.component';
import { NewBranchComponent } from './components/new-branch/new-branch.component';

const routes: Routes = [
  {path : "branch" , component:BranchesComponent},
  {path : "addBranch" , component:NewBranchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { 
   static routes = routes;
}
