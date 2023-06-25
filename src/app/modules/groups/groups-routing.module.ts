import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { AddGroupFormComponent } from './components/add-group-form/add-group-form.component';
import { UpdateGroupFormComponent } from './components/update-group-form/update-group-form.component';
import { PermissionGuard } from 'src/guards/permission.guard';

const routes: Routes = [
  {path:'groups',component:GroupsComponent,data:{'permission':9,'action':['Show']},canActivate:[PermissionGuard]},
  {path:'addGroups',component:AddGroupFormComponent,data:{'permission':9,'action':['Add']},canActivate:[PermissionGuard]},
  {path:'updateGroups/:id',component:UpdateGroupFormComponent,data:{'permission':9,'action':['Edit']},canActivate:[PermissionGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
  static routes = routes;
 }
