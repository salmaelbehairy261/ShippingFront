import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './components/groups/groups.component';
import { SharedModule } from '../shared/shared.module';
import { AddGroupFormComponent } from './components/add-group-form/add-group-form.component';
import { UpdateGroupFormComponent } from './components/update-group-form/update-group-form.component';


@NgModule({
  declarations: [
    GroupsComponent,AddGroupFormComponent, UpdateGroupFormComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule
  ]
})
export class GroupsModule { }
