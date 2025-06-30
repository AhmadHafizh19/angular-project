import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { DetailCreditur } from './detail-creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { creditur } from '../../../model/creditur';

describe('DetailCreditur', () => {
  let component: DetailCreditur;
  let fixture: ComponentFixture<DetailCreditur>;
  let dataSharingService: jasmine.SpyObj<DataSharingService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockCreditur: creditur = {
    id: 1,
    name: 'John Doe',
    age: 30,
    job: 'Software Engineer',
    creditScore: 85
  };

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService',
      ['getCrediturById'],
      { crediturData$: of([mockCreditur]) }
    );
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' })
    });

    await TestBed.configureTestingModule({
      imports: [DetailCreditur],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCreditur);
    component = fixture.componentInstance;
    dataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with undefined creditur and crediturId', () => {
    expect(component.creditur).toBeUndefined();
    expect(component.crediturId).toBeUndefined();
  });

  it('should load creditur detail on init', () => {
    dataSharingService.getCrediturById.and.returnValue(mockCreditur);

    component.ngOnInit();

    expect(component.crediturId).toBe('1' as any);
    expect(dataSharingService.getCrediturById).toHaveBeenCalledWith('1' as any);
    expect(component.creditur).toEqual(mockCreditur);
  });

  it('should navigate to 404 when creditur not found', () => {
    dataSharingService.getCrediturById.and.returnValue(undefined);

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/404']);
  });

  it('should reload creditur detail when data changes', () => {
    component.crediturId = '1' as any;
    dataSharingService.getCrediturById.and.returnValue(mockCreditur);

    component.ngOnInit();

    expect(dataSharingService.getCrediturById).toHaveBeenCalledWith('1' as any);
  });

  it('should navigate back to home when goBack is called', () => {
    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle route params change', () => {
    const newActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '2' })
    });

    TestBed.overrideProvider(ActivatedRoute, { useValue: newActivatedRoute });

    component.ngOnInit();

    expect(component.crediturId).toBe('2' as any);
  });
});
