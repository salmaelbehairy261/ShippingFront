import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentativeComponent } from './components/representative/representative.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import{DisplayOrderComponent} from './components/display-order/display-order.component'

@NgModule({
  declarations: [
    RepresentativeComponent,
    HomeComponent,
    DisplayOrderComponent
    
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports:[
    
  ]
})

export class RepresentativeModule {

}
