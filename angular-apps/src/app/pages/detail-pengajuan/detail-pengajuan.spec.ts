import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { DetailPengajuan } from './detail-pengajuan';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';

describe('DetailPengajuan', () => {
  let component: DetailPengajuan;
  let fixture: ComponentFixture<DetailPengajuan>;
  let dataSharingService: jasmine.SpyObj<DataSharingService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockPengajuan: PengajuanPinjaman = {
    id: 1,
    nama: 'John Doe',
    jumlahPinjaman: 5000000,
    tenor: 12,
    disetujui: true,
    tanggalPengajuan: new Date('2024-01-01')
  };

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService',
      ['getPengajuanById'],
      { pengajuanData$: of([mockPengajuan]) }
    );
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '1' })
    });

    await TestBed.configureTestingModule({
      imports: [DetailPengajuan],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPengajuan);
    component = fixture.componentInstance;
    dataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with undefined pengajuan and pengajuanId', () => {
    expect(component.pengajuan).toBeUndefined();
    expect(component.pengajuanId).toBeUndefined();
  });

  it('should load pengajuan detail on init', () => {
    dataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

    component.ngOnInit();

    expect(component.pengajuanId).toBe(1);
    expect(dataSharingService.getPengajuanById).toHaveBeenCalledWith(1);
    expect(component.pengajuan).toEqual(mockPengajuan);
  });

  it('should navigate to 404 when pengajuan not found', () => {
    dataSharingService.getPengajuanById.and.returnValue(undefined);

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/404']);
  });

  it('should reload pengajuan detail when data changes', () => {
    component.pengajuanId = 1;
    dataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

    component.ngOnInit();

    expect(dataSharingService.getPengajuanById).toHaveBeenCalledWith(1);
  });

  it('should navigate back to list-pengajuan when goBack is called', () => {
    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/list-pengajuan']);
  });

  it('should format currency correctly', () => {
    const amount = 5000000;
    const formattedAmount = component.formatCurrency(amount);

    expect(formattedAmount).toBe('Rp5.000.000,00');
  });

  it('should format different currency amounts correctly', () => {
    expect(component.formatCurrency(1000000)).toBe('Rp1.000.000,00');
    expect(component.formatCurrency(500000)).toBe('Rp500.000,00');
    expect(component.formatCurrency(10000000)).toBe('Rp10.000.000,00');
  });

  it('should handle route params change', () => {
    const newActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '2' })
    });

    TestBed.overrideProvider(ActivatedRoute, { useValue: newActivatedRoute });

    component.ngOnInit();

    expect(component.pengajuanId).toBe(2);
  });

  it('should convert string id to number', () => {
    dataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

    component.ngOnInit();

    expect(typeof component.pengajuanId).toBe('number');
    expect(component.pengajuanId).toBe(1);
  });
});
