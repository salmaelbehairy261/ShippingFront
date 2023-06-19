import { Component, OnInit } from '@angular/core';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title=''
  constructor(private navTitleService:NavTitleService){}
  ngOnInit(): void {
    this.navTitleService.title.subscribe(res=>{
      this.title=res
    })
  }

}
