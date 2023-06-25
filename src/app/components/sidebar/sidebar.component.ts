import { Permissions } from './../../modules/shared/models/Group';
import { AuthService } from './../../modules/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: any

  constructor(

    private authService:AuthService){}
  ngOnInit(): void {
    this.role = this.authService.getUserRole()

  }
  isStatCollapsed=true
  isSettingCollapsed=true
  isUsersCollapsed=true
  isLocCollapsed=true
  StatusNames: any = [
    "جديد",
    "قيد الانتظار",
    "تم التسليم للمندوب",
    "تم التسليم",
    "لا يمكن الوصول",
    "تم التاجيل",
    "تم التسليم جزئيا",
    "تم الالغاء من قبل المستلم",
    "تم الرفض مع الدفع",
    "رفض مع سداد جزء",
    "رفض من الموظف"
  ]
  StatusNamesRepresentative: any = [
    "الطلبات المسندة",
    "تم التسليم",
    "لا يمكن الوصول",
    "تم التاجيل",
    "تم التسليم جزئيا",
    "تم الالغاء من قبل المستلم",
    "تم الرفض مع الدفع",
    "رفض مع سداد جزء"
  ]


  hasPermission(id: number,action:string) {
    return this.authService.hasPermission(id,action);
  }




}



