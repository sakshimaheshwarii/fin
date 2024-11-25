import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();

      if (role === 'admin' && route.routeConfig?.path === 'admin') {
        return true;
      } else if (role === 'user' && route.routeConfig?.path === 'user/home') {
        return true;
      } else {
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user/home']);
        }
        return false;
      }
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
