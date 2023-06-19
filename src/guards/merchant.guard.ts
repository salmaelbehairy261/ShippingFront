import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = this.authService.getUserRole()
      if (role=='Merchant')
        return true;
      this.router.navigate(['/login']);
      return false;
  }
  
}
