import { CommonModule, Location } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ToastrModule } from "ngx-toastr";
import { PagingHeaderComponent } from "./component/paging-header/paging-header.component";
import { PagerComponent } from "./component/pager/pager.component";
import { SortComponent } from './component/sort/sort.component';
import { PageSizeComponent } from './component/page-size/page-size.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateAccountComponent } from './component/update-account/update-account.component';


@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
    SortComponent,
    PageSizeComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    PaginationModule.forRoot(),
    ModalModule
  ],
  exports:[
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PagerComponent,
    PagingHeaderComponent,
    SortComponent,
    PageSizeComponent,
    ModalModule,
    UpdateAccountComponent
  ],
})
export class SharedModule { }
