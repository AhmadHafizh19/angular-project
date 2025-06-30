import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListPengajuan } from './list-pengajuan';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjamanService } from '../../services/pengajuan-pinjaman/pengajuan-pinjaman';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';

describe('ListPengajuan', () => {
  let component: ListPengajuan;
  let fixture: ComponentFixture<ListPengajuan>;
  let dataSharingService: jasmine.SpyObj<DataSharingService>;
  let pengajuanService: jasmine.SpyObj<PengajuanPinjamanService>;

  const mockPengajuanData: PengajuanPinjaman[] = [
    {
      id: 1,
      nama: 'John Doe',
      jumlahPinjaman: 5000000,
      tenor: 12,
      disetujui: true,
      tanggalPengajuan: new Date('2024-01-01')
    },
    {
      id: 2,
      nama: 'Jane Smith',
      jumlahPinjaman: 10000000,
      tenor: 24,
      disetujui: false,
      tanggalPengajuan: new Date('2024-01-02')
    }
  ];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService',
      ['refreshPengajuanData', 'showPengajuanAlert'],
      { pengajuanData$: of(mockPengajuanData) }
    );
    const pengajuanServiceSpy = jasmine.createSpyObj('PengajuanPinjamanService', ['deletePengajuan']);

    await TestBed.configureTestingModule({
      imports: [ListPengajuan],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: PengajuanPinjamanService, useValue: pengajuanServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPengajuan);
    component = fixture.componentInstance;
    dataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    pengajuanService = TestBed.inject(PengajuanPinjamanService) as jasmine.SpyObj<PengajuanPinjamanService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty pengajuan data', () => {
    expect(component.pengajuanData).toEqual([]);
  });

  it('should subscribe to pengajuan data on init', () => {
    component.ngOnInit();
    expect(component.pengajuanData).toEqual(mockPengajuanData);
  });

  it('should delete pengajuan when user confirms', () => {
    const pengajuanToDelete = mockPengajuanData[0];
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDeletePengajuan(pengajuanToDelete);

    expect(pengajuanService.deletePengajuan).toHaveBeenCalledWith(pengajuanToDelete);
    expect(dataSharingService.refreshPengajuanData).toHaveBeenCalledWith(pengajuanService);
    expect(dataSharingService.showPengajuanAlert).toHaveBeenCalledWith('Pengajuan berhasil dihapus');
  });

  it('should not delete pengajuan when user cancels', () => {
    const pengajuanToDelete = mockPengajuanData[0];
    spyOn(window, 'confirm').and.returnValue(false);

    component.onDeletePengajuan(pengajuanToDelete);

    expect(pengajuanService.deletePengajuan).not.toHaveBeenCalled();
    expect(dataSharingService.refreshPengajuanData).not.toHaveBeenCalled();
    expect(dataSharingService.showPengajuanAlert).not.toHaveBeenCalled();
  });

  it('should show correct confirmation message', () => {
    const pengajuanToDelete = mockPengajuanData[1];
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDeletePengajuan(pengajuanToDelete);

    expect(window.confirm).toHaveBeenCalledWith('Apakah Anda yakin ingin menghapus pengajuan dari Jane Smith?');
  });

  it('should handle different pengajuan objects', () => {
    const customPengajuan: PengajuanPinjaman = {
      id: 3,
      nama: 'Bob Wilson',
      jumlahPinjaman: 7500000,
      tenor: 18,
      disetujui: false,
      tanggalPengajuan: new Date('2024-01-03')
    };

    spyOn(window, 'confirm').and.returnValue(true);

    component.onDeletePengajuan(customPengajuan);

    expect(pengajuanService.deletePengajuan).toHaveBeenCalledWith(customPengajuan);
    expect(window.confirm).toHaveBeenCalledWith('Apakah Anda yakin ingin menghapus pengajuan dari Bob Wilson?');
  });
});
