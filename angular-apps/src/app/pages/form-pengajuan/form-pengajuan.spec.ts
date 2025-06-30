import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormPengajuan } from './form-pengajuan';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjamanService } from '../../services/pengajuan-pinjaman/pengajuan-pinjaman';
import { creditur } from '../../../model/creditur';

describe('FormPengajuanComponent', () => {
  let component: FormPengajuan;
  let fixture: ComponentFixture<FormPengajuan>;
  let mockDataSharingService: jasmine.SpyObj<DataSharingService>;
  let mockPengajuanService: jasmine.SpyObj<PengajuanPinjamanService>;

  const mockCrediturData: creditur[] = [
    { id: 1, name: 'John Doe', age: 30, job: 'Developer', creditScore: 75 },
    { id: 2, name: 'Jane Smith', age: 28, job: 'Designer', creditScore: 82 }
  ];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService', [
      'showPengajuanAlert',
      'refreshPengajuanData',
      'getCrediturData'
    ], {
      crediturData$: of(mockCrediturData)
    });

    const pengajuanServiceSpy = jasmine.createSpyObj('PengajuanPinjamanService', ['addPengajuan']);

    await TestBed.configureTestingModule({
      imports: [FormPengajuan],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: PengajuanPinjamanService, useValue: pengajuanServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPengajuan);
    component = fixture.componentInstance;
    mockDataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    mockPengajuanService = TestBed.inject(PengajuanPinjamanService) as jasmine.SpyObj<PengajuanPinjamanService>;
  });

  it('should create the form pengajuan component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize creditur list from service on init', () => {
    component.ngOnInit();
    expect(component.crediturList).toEqual(mockCrediturData);
  });

  describe('Submit Pengajuan Functionality', () => {
    it('should submit pengajuan successfully', () => {
      const pengajuanData = {
        nama: 'John Doe',
        jumlahPinjaman: 10000000,
        tenor: 12
      };

      const mockResult = {
        success: true,
        message: 'Pengajuan berhasil'
      };

      mockPengajuanService.addPengajuan.and.returnValue(mockResult);
      mockDataSharingService.getCrediturData.and.returnValue(mockCrediturData);

      component.onSubmitPengajuan(pengajuanData);

      expect(mockPengajuanService.addPengajuan).toHaveBeenCalledWith(
        pengajuanData.nama,
        pengajuanData.jumlahPinjaman,
        pengajuanData.tenor,
        mockCrediturData
      );
      expect(mockDataSharingService.showPengajuanAlert).toHaveBeenCalledWith(mockResult.message, mockResult.success);
      expect(mockDataSharingService.refreshPengajuanData).toHaveBeenCalledWith(mockPengajuanService);
    });

    it('should handle pengajuan rejection', () => {
      const pengajuanData = {
        nama: 'Jane Smith',
        jumlahPinjaman: 50000000,
        tenor: 24
      };

      const mockResult = {
        success: false,
        message: 'Pengajuan ditolak karena credit score rendah'
      };

      mockPengajuanService.addPengajuan.and.returnValue(mockResult);
      mockDataSharingService.getCrediturData.and.returnValue(mockCrediturData);

      component.onSubmitPengajuan(pengajuanData);

      expect(mockDataSharingService.showPengajuanAlert).toHaveBeenCalledWith(mockResult.message, mockResult.success);
      expect(mockDataSharingService.refreshPengajuanData).toHaveBeenCalledWith(mockPengajuanService);
    });

    it('should pass correct parameters to addPengajuan service', () => {
      const pengajuanData = {
        nama: 'Test User',
        jumlahPinjaman: 5000000,
        tenor: 6
      };

      mockPengajuanService.addPengajuan.and.returnValue({ success: true, message: 'Success' });
      mockDataSharingService.getCrediturData.and.returnValue(mockCrediturData);

      component.onSubmitPengajuan(pengajuanData);

      expect(mockPengajuanService.addPengajuan).toHaveBeenCalledWith(
        'Test User',
        5000000,
        6,
        mockCrediturData
      );
    });
  });
});
