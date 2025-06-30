import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';
import { Login } from './login';
import { AuthService } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['Login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Login, FormsModule, CommonModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form fields', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.errorMessage).toBe('');
    expect(component.isLoading).toBe(false);
  });

  describe('Form Validation', () => {
    it('should show error message when email is empty', () => {
      component.email = '';
      component.password = 'password123';

      component.onSubmit();

      expect(component.errorMessage).toBe('Email dan password harus diisi');
      expect(mockAuthService.Login).not.toHaveBeenCalled();
    });

    it('should show error message when password is empty', () => {
      component.email = 'test@example.com';
      component.password = '';

      component.onSubmit();

      expect(component.errorMessage).toBe('Email dan password harus diisi');
      expect(mockAuthService.Login).not.toHaveBeenCalled();
    });

    it('should show error message when both email and password are empty', () => {
      component.email = '';
      component.password = '';

      component.onSubmit();

      expect(component.errorMessage).toBe('Email dan password harus diisi');
      expect(mockAuthService.Login).not.toHaveBeenCalled();
    });

    it('should not show error when both email and password are provided', () => {
      component.email = 'test@example.com';
      component.password = 'password123';

      mockAuthService.Login.and.returnValue(of({ token: 'fake-token' }));

      component.onSubmit();

      expect(mockAuthService.Login).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  describe('Successful Login', () => {
    it('should call AuthService.Login with correct credentials', () => {
      const email = 'test@example.com';
      const password = 'password123';
      component.email = email;
      component.password = password;

      mockAuthService.Login.and.returnValue(of({ token: 'fake-token' }));

      component.onSubmit();

      expect(mockAuthService.Login).toHaveBeenCalledWith(email, password);
    });

    it('should navigate to home page after successful login', () => {
      component.email = 'test@example.com';
      component.password = 'password123';

      mockAuthService.Login.and.returnValue(of({ token: 'fake-token' }));

      component.onSubmit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should clear error message on successful login', () => {
      component.email = 'test@example.com';
      component.password = 'password123';
      component.errorMessage = 'Previous error message';

      mockAuthService.Login.and.returnValue(of({ token: 'fake-token' }));

      component.onSubmit();

      expect(component.errorMessage).toBe('');
    });

    it('should set isLoading to false after successful login', () => {
      component.email = 'test@example.com';
      component.password = 'password123';

      mockAuthService.Login.and.returnValue(of({ token: 'fake-token' }));

      component.onSubmit();

      expect(component.isLoading).toBe(false);
    });
  });

  describe('Failed Login', () => {
    it('should handle login error and show error message', () => {
      component.email = 'test@example.com';
      component.password = 'wrongpassword';

      spyOn(console, 'error');
      mockAuthService.Login.and.returnValue(throwError(() => new Error('Login failed')));

      component.onSubmit();

      expect(component.errorMessage).toBe('Login gagal. Periksa email dan password Anda.');
      expect(console.error).toHaveBeenCalledWith('Login error:', jasmine.any(Error));
    });

    it('should set isLoading to false after login error', () => {
      component.email = 'test@example.com';
      component.password = 'wrongpassword';

      mockAuthService.Login.and.returnValue(throwError(() => new Error('Login failed')));

      component.onSubmit();

      expect(component.isLoading).toBe(false);
    });

    it('should not navigate after login error', () => {
      component.email = 'test@example.com';
      component.password = 'wrongpassword';

      mockAuthService.Login.and.returnValue(throwError(() => new Error('Login failed')));

      component.onSubmit();

      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should set isLoading to true during login process', () => {
      component.email = 'test@example.com';
      component.password = 'password123';

      // Create an observable that doesn't complete immediately
      let observer: any;
      const loginObservable = new Observable((obs: any) => {
        observer = obs;
      });
      mockAuthService.Login.and.returnValue(loginObservable);

      component.onSubmit();

      // At this point, the observable hasn't emitted yet, so isLoading should be true
      expect(component.isLoading).toBe(true);

      // Clean up by completing the observable
      if (observer) {
        observer.next({ token: 'fake-token' });
        observer.complete();
      }
    });

    it('should clear error message when starting new login attempt', () => {
      component.email = 'test@example.com';
      component.password = 'password123';
      component.errorMessage = 'Previous error';

      mockAuthService.Login.and.returnValue(of({ token: 'fake-token' }));

      component.onSubmit();

      expect(component.errorMessage).toBe('');
    });
  });
});
