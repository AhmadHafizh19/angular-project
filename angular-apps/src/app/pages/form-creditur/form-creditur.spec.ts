import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { FormCreditur } from './form-creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { ApiService } from '../../services/api/api';
import { creditur } from '../../../model/creditur';

describe('FormCreditur', () => {
  let component: FormCreditur;
  let fixture: ComponentFixture<FormCreditur>;
  let dataSharingService: jasmine.SpyObj<DataSharingService>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService',
      ['refreshCrediturData', 'showCrediturAlert']
    );
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['addData']);

    await TestBed.configureTestingModule({
      imports: [FormCreditur],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreditur);
    component = fixture.componentInstance;
    dataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add creditur successfully', () => {
    const newCrediturData: Omit<creditur, 'id' | 'creditScore'> = {
      name: 'John Doe',
      age: 30,
      job: 'Software Engineer'
    };

    apiService.addData.and.returnValue(of({ success: true, id: 1 }));
    spyOn(Math, 'random').and.returnValue(0.5); // Mock random to return 0.5

    component.onAddCreditur(newCrediturData);

    const expectedCrediturData = {
      ...newCrediturData,
      creditScore: 51 // Math.floor(0.5 * 100) + 1 = 51
    };

    expect(apiService.addData).toHaveBeenCalledWith(expectedCrediturData);
    expect(dataSharingService.refreshCrediturData).toHaveBeenCalledWith(apiService);
    expect(dataSharingService.showCrediturAlert).toHaveBeenCalledWith('Creditur berhasil ditambahkan');
  });

  it('should handle add creditur error', () => {
    const newCrediturData: Omit<creditur, 'id' | 'creditScore'> = {
      name: 'John Doe',
      age: 30,
      job: 'Software Engineer'
    };

    apiService.addData.and.returnValue(throwError(() => new Error('Add failed')));
    spyOn(console, 'error');

    component.onAddCreditur(newCrediturData);

    expect(console.error).toHaveBeenCalledWith('Error adding creditur:', jasmine.any(Error));
    expect(dataSharingService.showCrediturAlert).toHaveBeenCalledWith('Gagal menambahkan creditur');
  });

  it('should generate random credit score between 1 and 100', () => {
    const newCrediturData: Omit<creditur, 'id' | 'creditScore'> = {
      name: 'John Doe',
      age: 30,
      job: 'Software Engineer'
    };

    apiService.addData.and.returnValue(of({ success: true }));
    spyOn(Math, 'random').and.returnValue(0.99); // Mock random to return 0.99

    component.onAddCreditur(newCrediturData);

    const expectedCrediturData = {
      ...newCrediturData,
      creditScore: 100 // Math.floor(0.99 * 100) + 1 = 100
    };

    expect(apiService.addData).toHaveBeenCalledWith(expectedCrediturData);
  });

  it('should generate minimum credit score of 1', () => {
    const newCrediturData: Omit<creditur, 'id' | 'creditScore'> = {
      name: 'John Doe',
      age: 30,
      job: 'Software Engineer'
    };

    apiService.addData.and.returnValue(of({ success: true }));
    spyOn(Math, 'random').and.returnValue(0); // Mock random to return 0

    component.onAddCreditur(newCrediturData);

    const expectedCrediturData = {
      ...newCrediturData,
      creditScore: 1 // Math.floor(0 * 100) + 1 = 1
    };

    expect(apiService.addData).toHaveBeenCalledWith(expectedCrediturData);
  });
});
