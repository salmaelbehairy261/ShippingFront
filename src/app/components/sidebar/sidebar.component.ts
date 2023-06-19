import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(private router:Router){}
  isStatCollapsed=true
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
  reloadComponent() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}



