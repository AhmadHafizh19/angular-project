import { Injectable } from '@angular/core';
import { creditur } from '../../../model/creditur';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';
import { ApiService } from '../api/api';
import { PengajuanPinjamanService } from '../pengajuan-pinjaman/pengajuan-pinjaman';
import { DataSharingService } from '../data-sharing/data-sharing';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(
    private apiService: ApiService,
    private pengajuanService: PengajuanPinjamanService,
    private dataSharingService: DataSharingService
  ) {}

  addCreditur(newCreditur: Omit<creditur, 'id' | 'creditScore'>): void {
    const crediturData = {
      ...newCreditur,
      creditScore: Math.floor(Math.random() * 100) + 1
    };

    this.apiService.addData(crediturData).subscribe({
      next: (response: any) => {
        this.loadCrediturData();
        this.dataSharingService.showCrediturAlert('Creditur berhasil ditambahkan');
      },
      error: (error) => {
        console.error('Error adding creditur:', error);
        this.dataSharingService.showCrediturAlert('Gagal menambahkan creditur');
      }
    });
  }

  deleteCreditur(crediturToDelete: creditur): void {
    this.apiService.deleteData(crediturToDelete.id.toString()).subscribe({
      next: (response: any) => {
        this.loadCrediturData();
        this.dataSharingService.showCrediturAlert('Creditur berhasil dihapus');
      },
      error: (error) => {
        console.error('Error deleting creditur:', error);
        this.dataSharingService.showCrediturAlert('Gagal menghapus creditur');
      }
    });
  }

  submitPengajuan(pengajuanData: {nama: string, jumlahPinjaman: number, tenor: number}): void {
    const result = this.pengajuanService.addPengajuan(
      pengajuanData.nama,
      pengajuanData.jumlahPinjaman,
      pengajuanData.tenor,
      this.dataSharingService.getCrediturData()
    );

    this.dataSharingService.showPengajuanAlert(result.message);

    // Always update the pengajuan data regardless of success/failure
    // because we now store both approved and rejected applications
    const updatedPengajuanData = this.pengajuanService.getPengajuanData();
    this.dataSharingService.setPengajuanData(updatedPengajuanData);
  }

  deletePengajuan(pengajuanToDelete: PengajuanPinjaman): void {
    const updatedData = this.pengajuanService.deletePengajuan(pengajuanToDelete);
    this.dataSharingService.setPengajuanData(updatedData);
  }

  loadCrediturData(): void {
    this.apiService.getData().subscribe({
      next: (data: any) => {
        this.dataSharingService.setCrediturData(data);
      },
      error: (error) => {
        console.error('Error loading creditur data:', error);
        this.dataSharingService.showCrediturAlert('Gagal memuat data creditur');
      }
    });
  }
}
