import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router:Router,private authService: AuthService){}
  flag=false
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const requiredPermission = route.data['permission'];
      const requiredAction=route.data['action'];
      requiredAction.forEach((value:string) => {
        if (this.authService.hasPermission(requiredPermission,value)){
          this.flag=true;
        }
      })
      if(this.flag)
        return true
      else{
        this.router.navigate(['/employee']);
        return false;
      }
  }

}
