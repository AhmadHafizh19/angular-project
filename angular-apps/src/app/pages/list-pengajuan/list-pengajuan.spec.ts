import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListPengajuan } from './list-pengajuan';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjamanService } from '../../services/pengajuan-pinjaman/pengajuan-pinjaman';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';

describe('ListPengajuanComponent', () => {
  let component: ListPengajuan;
  let fixture: ComponentFixture<ListPengajuan>;
  let mockDataSharingService: jasmine.SpyObj<DataSharingService>;
  let mockPengajuanService: jasmine.SpyObj<PengajuanPinjamanService>;

  const mockPengajuanData: PengajuanPinjaman[] = [
    {
      id: 1,
      nama: 'John Doe',
      jumlahPinjaman: 10000000,
      tenor: 12,
      disetujui: true,
      tanggalPengajuan: new Date('2024-01-01')
    },
    {
      id: 2,
      nama: 'Jane Smith',
      jumlahPinjaman: 5000000,
      tenor: 6,
      disetujui: false,
      alasan: 'Credit score rendah',
      tanggalPengajuan: new Date('2024-01-02')
    }
  ];

  beforeEach(async () => {
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService', [
      'refreshPengajuanData',
      'showPengajuanAlert'
    ], {
      pengajuanData$: of(mockPengajuanData)
    });

    const pengajuanServiceSpy = jasmine.createSpyObj('PengajuanPinjamanService', ['deletePengajuan']);

    await TestBed.configureTestingModule({
      imports: [ListPengajuan],
      providers: [
        { provide: DataSharingService, useValue: dataSharingServiceSpy },
        { provide: PengajuanPinjamanService, useValue: pengajuanServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPengajuan);
    component = fixture.componentInstance;
    mockDataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
    mockPengajuanService = TestBed.inject(PengajuanPinjamanService) as jasmine.SpyObj<PengajuanPinjamanService>;
  });

  it('should create the list pengajuan component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pengajuan data from service on init', () => {
    component.ngOnInit();
    expect(component.pengajuanData).toEqual(mockPengajuanData);
  });

  describe('Delete Pengajuan Functionality', () => {
    it('should delete pengajuan when confirmed', () => {
      const pengajuanToDelete = mockPengajuanData[0];
      spyOn(window, 'confirm').and.returnValue(true);

      component.onDeletePengajuan(pengajuanToDelete);

      expect(window.confirm).toHaveBeenCalledWith(`Apakah Anda yakin ingin menghapus pengajuan dari ${pengajuanToDelete.nama}?`);
      expect(mockPengajuanService.deletePengajuan).toHaveBeenCalledWith(pengajuanToDelete);
      expect(mockDataSharingService.refreshPengajuanData).toHaveBeenCalledWith(mockPengajuanService);
      expect(mockDataSharingService.showPengajuanAlert).toHaveBeenCalledWith('Pengajuan berhasil dihapus');
    });

    it('should not delete pengajuan when not confirmed', () => {
      const pengajuanToDelete = mockPengajuanData[0];
      spyOn(window, 'confirm').and.returnValue(false);

      component.onDeletePengajuan(pengajuanToDelete);

      expect(window.confirm).toHaveBeenCalled();
      expect(mockPengajuanService.deletePengajuan).not.toHaveBeenCalled();
      expect(mockDataSharingService.refreshPengajuanData).not.toHaveBeenCalled();
      expect(mockDataSharingService.showPengajuanAlert).not.toHaveBeenCalled();
    });

    it('should show correct confirmation message with pengajuan nama', () => {
      const pengajuanToDelete = mockPengajuanData[1];
      spyOn(window, 'confirm').and.returnValue(true);

      component.onDeletePengajuan(pengajuanToDelete);

      expect(window.confirm).toHaveBeenCalledWith(`Apakah Anda yakin ingin menghapus pengajuan dari ${pengajuanToDelete.nama}?`);
    });
  });
});
