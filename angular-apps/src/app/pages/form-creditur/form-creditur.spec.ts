import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormCreditur } from './form-creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { ApiService } from '../../services/api/api';
import { creditur } from '../../../model/creditur';

describe('FormCrediturComponent', () => {
  let component: FormCreditur;
  let fixture: ComponentFixture<FormCreditur>;
  let mockDataSharingService: jasmine.SpyObj<DataSharingService>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService', [
      'refreshCrediturData',
      'showCrediturAlert'
    ]);

    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['addData']);

    await TestBed.configureTestingModule({
      imports: [FormCreditur],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCreditur);
    component = fixture.componentInstance;
    mockDataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create the form creditur component', () => {
    expect(component).toBeTruthy();
  });

  describe('Add Creditur Functionality', () => {
    it('should add new creditur successfully', () => {
      const newCreditur: Omit<creditur, 'id' | 'creditScore'> = {
        name: 'Test User',
        age: 25,
        job: 'Tester'
      };

      mockApiService.addData.and.returnValue(of({ success: true }));

      component.onAddCreditur(newCreditur);

      expect(mockApiService.addData).toHaveBeenCalled();
      const callArgs = mockApiService.addData.calls.mostRecent().args[0];
      expect(callArgs.name).toBe('Test User');
      expect(callArgs.age).toBe(25);
      expect(callArgs.job).toBe('Tester');
      expect(callArgs.creditScore).toBeGreaterThanOrEqual(1);
      expect(callArgs.creditScore).toBeLessThanOrEqual(100);
      expect(mockDataSharingService.refreshCrediturData).toHaveBeenCalledWith(mockApiService);
      expect(mockDataSharingService.showCrediturAlert).toHaveBeenCalledWith('Creditur berhasil ditambahkan');
    });

    it('should generate credit score between 1 and 100', () => {
      const newCreditur: Omit<creditur, 'id' | 'creditScore'> = {
        name: 'Test User',
        age: 25,
        job: 'Tester'
      };

      mockApiService.addData.and.returnValue(of({ success: true }));

      // Test multiple times to ensure credit score is within range
      for (let i = 0; i < 10; i++) {
        component.onAddCreditur(newCreditur);
        const lastCall = mockApiService.addData.calls.mostRecent();
        const crediturData = lastCall.args[0] as creditur;
        expect(crediturData.creditScore).toBeGreaterThanOrEqual(1);
        expect(crediturData.creditScore).toBeLessThanOrEqual(100);
      }
    });

    it('should handle add creditur error', () => {
      const newCreditur: Omit<creditur, 'id' | 'creditScore'> = {
        name: 'Test User',
        age: 25,
        job: 'Tester'
      };

      spyOn(console, 'error');
      mockApiService.addData.and.returnValue(throwError(() => new Error('Add failed')));

      component.onAddCreditur(newCreditur);

      expect(mockDataSharingService.showCrediturAlert).toHaveBeenCalledWith('Gagal menambahkan creditur');
      expect(console.error).toHaveBeenCalledWith('Error adding creditur:', jasmine.any(Error));
    });
  });
});
