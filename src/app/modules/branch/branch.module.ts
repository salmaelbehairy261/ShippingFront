import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BranchesComponent } from './components/branches/branches.component';


@NgModule({
  declarations: [
    BranchesComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    SharedModule
  ]
})
export class BranchModule { }
