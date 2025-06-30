import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login'; // Komponen standalone
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['Login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if email or password is empty', () => {
    component.email = '';
    component.password = '';
    component.onSubmit();
    expect(component.errorMessage).toBe('Email dan password harus diisi');
  });

  it('should call login and navigate on success', () => {
    component.email = 'test@example.com';
    component.password = 'password';
    authServiceSpy.Login.and.returnValue(of({ token: 'abc' }));

    component.onSubmit();

    expect(authServiceSpy.Login).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login failure', () => {
    authServiceSpy.Login.and.returnValue(throwError(() => new Error('Invalid')));
    component.email = 'wrong@example.com';
    component.password = 'wrong';

    component.onSubmit();

    expect(component.errorMessage).toBe('Login gagal. Periksa email dan password Anda.');
  });
});
