import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentativeComponent } from './components/representative/representative.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    RepresentativeComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports:[
    
  ]
})

export class RepresentativeModule {

}
