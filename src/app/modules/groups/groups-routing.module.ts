import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { AddGroupFormComponent } from './components/add-group-form/add-group-form.component';

const routes: Routes = [
  {path:'groups',component:GroupsComponent},
  {path:'addGroups',component:AddGroupFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
  static routes = routes;
 }
