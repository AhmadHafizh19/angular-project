import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FormPengajuan } from './form-pengajuan';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjamanService } from '../../services/pengajuan-pinjaman/pengajuan-pinjaman';
import { creditur } from '../../../model/creditur';

describe('FormPengajuan', () => {
  let component: FormPengajuan;
  let fixture: ComponentFixture<FormPengajuan>;
  let dataSharingService: jasmine.SpyObj<DataSharingService>;
  let pengajuanService: jasmine.SpyObj<PengajuanPinjamanService>;

  const mockCrediturData: creditur[] = [
    { id: 1, name: 'John Doe', age: 30, job: 'Software Engineer', creditScore: 85 },
    { id: 2, name: 'Jane Smith', age: 25, job: 'Teacher', creditScore: 75 }
  ];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService',
      ['getCrediturData', 'showPengajuanAlert', 'refreshPengajuanData'],
      { crediturData$: of(mockCrediturData) }
    );
    const pengajuanServiceSpy = jasmine.createSpyObj('PengajuanPinjamanService', ['addPengajuan']);

    await TestBed.configureTestingModule({
      imports: [FormPengajuan],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: PengajuanPinjamanService, useValue: pengajuanServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPengajuan);
    component = fixture.componentInstance;
    dataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    pengajuanService = TestBed.inject(PengajuanPinjamanService) as jasmine.SpyObj<PengajuanPinjamanService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty creditur list', () => {
    expect(component.crediturList).toEqual([]);
  });

  it('should subscribe to creditur data on init', () => {
    component.ngOnInit();
    expect(component.crediturList).toEqual(mockCrediturData);
  });

  it('should submit pengajuan successfully', () => {
    const pengajuanData = {
      nama: 'John Doe',
      jumlahPinjaman: 5000000,
      tenor: 12
    };

    const mockResult = {
      success: true,
      message: 'Pengajuan berhasil disubmit'
    };

    dataSharingService.getCrediturData.and.returnValue(mockCrediturData);
    pengajuanService.addPengajuan.and.returnValue(mockResult);

    component.onSubmitPengajuan(pengajuanData);

    expect(pengajuanService.addPengajuan).toHaveBeenCalledWith(
      'John Doe',
      5000000,
      12,
      mockCrediturData
    );
    expect(dataSharingService.showPengajuanAlert).toHaveBeenCalledWith(
      'Pengajuan berhasil disubmit',
      true
    );
    expect(dataSharingService.refreshPengajuanData).toHaveBeenCalledWith(pengajuanService);
  });

  it('should handle pengajuan submission failure', () => {
    const pengajuanData = {
      nama: 'John Doe',
      jumlahPinjaman: 5000000,
      tenor: 12
    };

    const mockResult = {
      success: false,
      message: 'Pengajuan gagal disubmit'
    };

    dataSharingService.getCrediturData.and.returnValue(mockCrediturData);
    pengajuanService.addPengajuan.and.returnValue(mockResult);

    component.onSubmitPengajuan(pengajuanData);

    expect(dataSharingService.showPengajuanAlert).toHaveBeenCalledWith(
      'Pengajuan gagal disubmit',
      false
    );
    expect(dataSharingService.refreshPengajuanData).toHaveBeenCalledWith(pengajuanService);
  });

  it('should handle different pengajuan data formats', () => {
    const pengajuanData = {
      nama: 'Jane Smith',
      jumlahPinjaman: 10000000,
      tenor: 24
    };

    const mockResult = {
      success: true,
      message: 'Pengajuan berhasil'
    };

    dataSharingService.getCrediturData.and.returnValue(mockCrediturData);
    pengajuanService.addPengajuan.and.returnValue(mockResult);

    component.onSubmitPengajuan(pengajuanData);

    expect(pengajuanService.addPengajuan).toHaveBeenCalledWith(
      'Jane Smith',
      10000000,
      24,
      mockCrediturData
    );
  });
});
