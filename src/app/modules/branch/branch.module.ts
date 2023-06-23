import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BranchesComponent } from './components/branches/branches.component';
import { NewBranchComponent } from './components/new-branch/new-branch.component';


@NgModule({
  declarations: [
    BranchesComponent,
    NewBranchComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    SharedModule
  ]
})
export class BranchModule { }
