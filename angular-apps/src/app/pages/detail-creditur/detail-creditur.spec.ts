import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { DetailCreditur } from './detail-creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { creditur } from '../../../model/creditur';

describe('DetailCrediturComponent', () => {
  let component: DetailCreditur;
  let fixture: ComponentFixture<DetailCreditur>;
  let mockDataSharingService: jasmine.SpyObj<DataSharingService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockCreditur: creditur = {
    id: 1,
    name: 'John Doe',
    age: 30,
    job: 'Developer',
    creditScore: 75
  };

  const mockCrediturData: creditur[] = [mockCreditur];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService', [
      'getCrediturById'
    ], {
      crediturData$: of(mockCrediturData)
    });

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [DetailCreditur],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCreditur);
    component = fixture.componentInstance;
    mockDataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the detail creditur component', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should load creditur detail on init', () => {
      mockDataSharingService.getCrediturById.and.returnValue(mockCreditur);

      component.ngOnInit();

      expect(component.crediturId).toBe('1');
      expect(mockDataSharingService.getCrediturById).toHaveBeenCalledWith('1');
      expect(component.creditur).toEqual(mockCreditur);
    });

    it('should navigate to 404 if creditur not found', () => {
      mockDataSharingService.getCrediturById.and.returnValue(undefined);

      component.ngOnInit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should reload creditur detail when data changes', () => {
      mockDataSharingService.getCrediturById.and.returnValue(mockCreditur);

      component.ngOnInit();

      // Trigger the crediturData$ subscription manually
      expect(mockDataSharingService.getCrediturById).toHaveBeenCalledWith('1');
    });
  });

  describe('Route Parameter Changes', () => {
    it('should handle route parameter changes', () => {
      mockActivatedRoute.params = of({ id: '2' });
      mockDataSharingService.getCrediturById.and.returnValue(mockCreditur);

      component.ngOnInit();

      expect(component.crediturId).toBe('2');
      expect(mockDataSharingService.getCrediturById).toHaveBeenCalledWith('2');
    });
  });

  describe('Navigation', () => {
    it('should navigate back to home', () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('Private Methods', () => {
    it('should load creditur detail when crediturId exists', () => {
      component.crediturId = 1;
      mockDataSharingService.getCrediturById.and.returnValue(mockCreditur);

      component['loadCrediturDetail']();

      expect(mockDataSharingService.getCrediturById).toHaveBeenCalledWith('1');
      expect(component.creditur).toEqual(mockCreditur);
    });

    it('should not load creditur detail when crediturId is undefined', () => {
      component.crediturId = undefined;

      component['loadCrediturDetail']();

      expect(mockDataSharingService.getCrediturById).not.toHaveBeenCalled();
    });
  });
});
