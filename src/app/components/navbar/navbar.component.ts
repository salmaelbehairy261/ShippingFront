import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { UpdateAccountComponent } from 'src/app/modules/shared/component/update-account/update-account.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title=''
  name=''
  constructor(
    private navTitleService:NavTitleService,
    private authService:AuthService,
    private router:Router,
    private cookieService:CookieService,
    private modalService: NgbModal,){}
  ngOnInit(): void {
    this.navTitleService.title.subscribe(res=>{
      this.title=res
    })
    this.name=this.authService.getUserName()
    console.log(this.name)
  }
  logout(){
    this.authService.logout().subscribe(res=>{
      this.cookieService.deleteAll()
      window.location.reload();
      this.router.navigate(['/login'])
    })
  }
  updatePassword(){
    const modalRef = this.modalService.open(UpdateAccountComponent, {centered: true,});
  }
}
