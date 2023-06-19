import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from './modules/shared/shared.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { LoginModule } from './modules/login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { AuthService } from './modules/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    PaginationModule.forRoot(),
    SharedModule,
    MerchantModule,
    LoginModule
  ],
  providers: [
    CookieService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
