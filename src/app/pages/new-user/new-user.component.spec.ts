import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from 'src/app/pages/new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { of, throwError } from 'rxjs'; // For mocking observables

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService; // Declare AuthService variable

  const mockAuthService = {
    register: jasmine.createSpy('register').and.returnValue(of({ token: 'dummy-token' })), // Simulate successful registration
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule // Import RouterTestingModule for navigation testing
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService } // Provide the mock AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.register on form submission', () => {
    component.user = {
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    };
    const form = { valid: true };
    component.onRegister(form as any);
    expect(authService.register).toHaveBeenCalledWith(component.user);
  });

  it('should navigate to dashboard after successful registration', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    const form = { valid: true };
    component.onRegister(form as any);
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show an alert on registration failure', () => {
    (authService.register as jasmine.Spy).and.returnValue(throwError('Registration failed'));
    spyOn(window, 'alert');
    const form = { valid: true };
    component.onRegister(form as any);
    expect(window.alert).toHaveBeenCalledWith('Registration failed. Please try again.');
  });
});
