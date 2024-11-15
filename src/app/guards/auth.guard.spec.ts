import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { observable } from 'rxjs';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getLoginStatus']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation if user is logged in', () => {
    authService.getLoginStatus.and.returnValue(true);// Mocking logged-in status

    const result = guard.canActivate();
    expect(result).toBeTrue();  // Expect guard to allow activation
  });

  it('should block activation and redirect to welcome if user is not logged in', () => {
    authService.getLoginStatus.and.returnValue(false);  // Mocking logged-out status

    const result = guard.canActivate();
    expect(result).toBeFalse();  // Expect guard to block activation
    expect(router.navigate).toHaveBeenCalledWith(['/welcome']);  // Expect redirect
  });
});
