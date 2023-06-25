import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    const role=this.authService.getUserRole()
    if (role == "Merchant")
      this.router.navigate(['/merchant'])
    else if (role == "Representative")
      this.router.navigate(['/representative'])
    else if (role == 'Employee')
    {
      this.router.navigate(['/employee']);
      this.authService.getPermissions();
    }
  }

}
