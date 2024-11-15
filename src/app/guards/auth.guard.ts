import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();

      // Check route and role
      if (role === 'admin' && route.routeConfig?.path === 'admin') {
        return true; // Admin can access the admin route
      } else if (role === 'user' && route.routeConfig?.path === 'user/home') {
        return true; // User can access user home
      } else {
        // Redirect based on role if they don't match the route
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user/home']);
        }
        return false;
      }
    } else {
      // Not logged in, redirect to home
      this.router.navigate(['/home']);
      return false;
    }
  }
}
