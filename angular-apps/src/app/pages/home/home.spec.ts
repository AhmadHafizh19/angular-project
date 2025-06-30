import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Home } from './home';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { ApiService } from '../../services/api/api';
import { AuthService } from '../../services/auth/auth';
import { creditur } from '../../../model/creditur';

describe('HomeComponent', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockDataSharingService: jasmine.SpyObj<DataSharingService>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockCrediturData: creditur[] = [
    { id: 1, name: 'John Doe', age: 30, job: 'Developer', creditScore: 75 },
    { id: 2, name: 'Jane Smith', age: 28, job: 'Designer', creditScore: 82 }
  ];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService', [
      'refreshCrediturData',
      'showCrediturAlert'
    ], {
      crediturData$: of(mockCrediturData)
    });

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
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    mockDataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize creditur data from service on init', () => {
    component.ngOnInit();
    expect(component.crediturData).toEqual(mockCrediturData);
  });

  describe('Logout Functionality', () => {
    it('should call logout and navigate to login on logout', () => {
      component.onLogout();
      expect(mockAuthService.logout).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('Delete Creditur Functionality', () => {
    it('should delete creditur when confirmed', () => {
      const crediturToDelete = mockCrediturData[0];
      spyOn(window, 'confirm').and.returnValue(true);
      mockApiService.deleteData.and.returnValue(of({}));

      component.onDeleteCreditur(crediturToDelete);

      expect(window.confirm).toHaveBeenCalledWith(`Apakah Anda yakin ingin menghapus creditur ${crediturToDelete.name}?`);
      expect(mockApiService.deleteData).toHaveBeenCalledWith(crediturToDelete.id.toString());
      expect(mockDataSharingService.refreshCrediturData).toHaveBeenCalledWith(mockApiService);
      expect(mockDataSharingService.showCrediturAlert).toHaveBeenCalledWith('Creditur berhasil dihapus');
    });

    it('should not delete creditur when not confirmed', () => {
      const crediturToDelete = mockCrediturData[0];
      spyOn(window, 'confirm').and.returnValue(false);

      component.onDeleteCreditur(crediturToDelete);

      expect(window.confirm).toHaveBeenCalled();
      expect(mockApiService.deleteData).not.toHaveBeenCalled();
      expect(mockDataSharingService.refreshCrediturData).not.toHaveBeenCalled();
      expect(mockDataSharingService.showCrediturAlert).not.toHaveBeenCalled();
    });

    it('should handle delete error', () => {
      const crediturToDelete = mockCrediturData[0];
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(console, 'error');
      mockApiService.deleteData.and.returnValue(throwError(() => new Error('Delete failed')));

      component.onDeleteCreditur(crediturToDelete);

      expect(mockDataSharingService.showCrediturAlert).toHaveBeenCalledWith('Gagal menghapus creditur');
      expect(console.error).toHaveBeenCalledWith('Error deleting creditur:', jasmine.any(Error));
    });
  });
});
