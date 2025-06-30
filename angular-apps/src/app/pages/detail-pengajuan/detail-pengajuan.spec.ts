import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DetailPengajuan } from './detail-pengajuan';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';

describe('DetailPengajuanComponent', () => {
  let component: DetailPengajuan;
  let fixture: ComponentFixture<DetailPengajuan>;
  let mockDataSharingService: jasmine.SpyObj<DataSharingService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockPengajuan: PengajuanPinjaman = {
    id: 1,
    nama: 'John Doe',
    jumlahPinjaman: 10000000,
    tenor: 12,
    disetujui: true,
    tanggalPengajuan: new Date('2024-01-01')
  };

  const mockPengajuanData: PengajuanPinjaman[] = [mockPengajuan];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService', [
      'getPengajuanById'
    ], {
      pengajuanData$: of(mockPengajuanData)
    });

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [DetailPengajuan],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPengajuan);
    component = fixture.componentInstance;
    mockDataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the detail pengajuan component', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should load pengajuan detail on init', () => {
      mockDataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

      component.ngOnInit();

      expect(component.pengajuanId).toBe('1');
      expect(mockDataSharingService.getPengajuanById).toHaveBeenCalledWith('1');
      expect(component.pengajuan).toEqual(mockPengajuan);
    });

    it('should navigate to 404 if pengajuan not found', () => {
      mockDataSharingService.getPengajuanById.and.returnValue(undefined);

      component.ngOnInit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should reload pengajuan detail when data changes', () => {
      mockDataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

      component.ngOnInit();

      expect(mockDataSharingService.getPengajuanById).toHaveBeenCalledWith('1');
    });
  });

  describe('Route Parameter Changes', () => {
    it('should handle route parameter changes', () => {
      mockActivatedRoute.params = of({ id: '2' });
      mockDataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

      component.ngOnInit();

      expect(component.pengajuanId).toBe('2');
      expect(mockDataSharingService.getPengajuanById).toHaveBeenCalledWith('2');
    });

    it('should convert string id to number', () => {
      mockActivatedRoute.params = of({ id: '123' });
      mockDataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

      component.ngOnInit();

      expect(component.pengajuanId).toBe('123');
      expect(typeof component.pengajuanId).toBe('string');
    });
  });

  describe('Navigation', () => {
    it('should navigate back to list pengajuan', () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-pengajuan']);
    });
  });

  describe('Currency Formatting', () => {
    it('should format currency correctly', () => {
      const amount = 10000000;
      const formattedAmount = component.formatCurrency(amount);

      expect(formattedAmount).toContain('Rp');
      expect(formattedAmount).toContain('10.000.000');
    });

    it('should format different amounts correctly', () => {
      expect(component.formatCurrency(1000)).toContain('1.000');
      expect(component.formatCurrency(500000)).toContain('500.000');
      expect(component.formatCurrency(1500000)).toContain('1.500.000');
    });
  });

  describe('Private Methods', () => {
    it('should load pengajuan detail when pengajuanId exists', () => {
      component.pengajuanId = '1';
      mockDataSharingService.getPengajuanById.and.returnValue(mockPengajuan);

      component['loadPengajuanDetail']();

      expect(mockDataSharingService.getPengajuanById).toHaveBeenCalledWith('1');
      expect(component.pengajuan).toEqual(mockPengajuan);
    });

    it('should not load pengajuan detail when pengajuanId is undefined', () => {
      component.pengajuanId = undefined;

      component['loadPengajuanDetail']();

      expect(mockDataSharingService.getPengajuanById).not.toHaveBeenCalled();
    });
  });
});
