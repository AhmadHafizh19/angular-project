import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { Home } from './home';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { ApiService } from '../../services/api/api';
import { AuthService } from '../../services/auth/auth';
import { creditur } from '../../../model/creditur';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let dataSharingService: jasmine.SpyObj<DataSharingService>;
  let apiService: jasmine.SpyObj<ApiService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockCrediturData: creditur[] = [
    { id: 1, name: 'John Doe', age: 30, job: 'Software Engineer', creditScore: 85 },
    { id: 2, name: 'Jane Smith', age: 25, job: 'Teacher', creditScore: 75 }
  ];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService',
      ['refreshCrediturData', 'showCrediturAlert'],
      { crediturData$: of(mockCrediturData) }
    );
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['deleteData']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    dataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty creditur data', () => {
    expect(component.crediturData).toEqual([]);
  });

  it('should subscribe to creditur data on init', () => {
    component.ngOnInit();
    expect(component.crediturData).toEqual(mockCrediturData);
  });

  it('should call logout and navigate to login on logout', () => {
    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should delete creditur successfully', () => {
    const crediturToDelete = mockCrediturData[0];
    apiService.deleteData.and.returnValue(of({ success: true }));
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDeleteCreditur(crediturToDelete);

    expect(apiService.deleteData).toHaveBeenCalledWith('1');
    expect(dataSharingService.refreshCrediturData).toHaveBeenCalledWith(apiService);
    expect(dataSharingService.showCrediturAlert).toHaveBeenCalledWith('Creditur berhasil dihapus');
  });

  it('should handle delete creditur error', () => {
    const crediturToDelete = mockCrediturData[0];
    apiService.deleteData.and.returnValue(throwError(() => new Error('Delete failed')));
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(console, 'error');

    component.onDeleteCreditur(crediturToDelete);

    expect(apiService.deleteData).toHaveBeenCalledWith('1');
    expect(console.error).toHaveBeenCalledWith('Error deleting creditur:', jasmine.any(Error));
    expect(dataSharingService.showCrediturAlert).toHaveBeenCalledWith('Gagal menghapus creditur');
  });

  it('should not delete creditur when user cancels confirmation', () => {
    const crediturToDelete = mockCrediturData[0];
    spyOn(window, 'confirm').and.returnValue(false);

    component.onDeleteCreditur(crediturToDelete);

    expect(apiService.deleteData).not.toHaveBeenCalled();
  });
});
