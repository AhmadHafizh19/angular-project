import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from "./shared/table/table";
import { FormComponent } from './shared/form/form';
import { PengajuanForm } from './shared/pengajuan-form/pengajuan-form';
import { PengajuanTable } from './shared/pengajuan-table/pengajuan-table';
import { creditur } from '../model/creditur';
import { PengajuanPinjaman } from '../model/pengajuan-pinjaman';
import { PengajuanPinjamanService } from './services/pengajuan-pinjaman/pengajuan-pinjaman';
import { ApiService } from './services/api/api';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    Table,
    FormComponent,
    PengajuanForm,
    PengajuanTable
  ],
  providers: [PengajuanPinjamanService, ApiService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected readonly title = 'angular-apps';

  crediturData: creditur[] = [];
  pengajuanData: PengajuanPinjaman[] = [];

  // Alert for Creditur operations
  crediturAlertMessage: string = '';
  showCrediturAlert: boolean = false;

  // Alert for Pengajuan operations
  pengajuanAlertMessage: string = '';
  showPengajuanAlert: boolean = false;

  constructor(
    private pengajuanService: PengajuanPinjamanService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCrediturData();
    this.pengajuanData = this.pengajuanService.getPengajuanData();
  }

  private loadCrediturData(): void {
    this.apiService.getData().subscribe({
      next: (data: any) => {
        this.crediturData = data;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error loading creditur data:', error);
        this.showCrediturAlertMessage('Gagal memuat data creditur', false);
      }
    });
  }

  onAddCreditur(newCreditur: Omit<creditur, 'id' | 'creditScore'>): void {
    const crediturData = {
      ...newCreditur,
      creditScore: Math.floor(Math.random() * 850) + 300 // Generate random credit score between 300-850
    };

    this.apiService.addData(crediturData).subscribe({
      next: (response: any) => {
        this.loadCrediturData(); // Reload data from API
        this.showCrediturAlertMessage('Creditur berhasil ditambahkan', true);
      },
      error: (error) => {
        console.error('Error adding creditur:', error);
        this.showCrediturAlertMessage('Gagal menambahkan creditur', false);
      }
    });
  }

  onDeleteCreditur(crediturToDelete: creditur): void {
    this.apiService.deleteData(crediturToDelete.id.toString()).subscribe({
      next: (response: any) => {
        this.loadCrediturData(); // Reload data from API
        this.showCrediturAlertMessage('Creditur berhasil dihapus', true);
      },
      error: (error) => {
        console.error('Error deleting creditur:', error);
        this.showCrediturAlertMessage('Gagal menghapus creditur', false);
      }
    });
  }

  onSubmitPengajuan(pengajuanData: {nama: string, jumlahPinjaman: number, tenor: number}): void {
    const result = this.pengajuanService.addPengajuan(
      pengajuanData.nama,
      pengajuanData.jumlahPinjaman,
      pengajuanData.tenor,
      this.crediturData
    );

    this.showPengajuanAlertMessage(result.message, result.success);

    if (result.success) {
      this.pengajuanData = this.pengajuanService.getPengajuanData();
    }
  }

  onDeletePengajuan(pengajuanToDelete: PengajuanPinjaman): void {
    this.pengajuanData = this.pengajuanService.deletePengajuan(pengajuanToDelete);
  }

  private showCrediturAlertMessage(message: string, isSuccess: boolean): void {
    this.crediturAlertMessage = message;
    this.showCrediturAlert = true;

    setTimeout(() => {
      this.showCrediturAlert = false;
    }, 3000);
  }

  private showPengajuanAlertMessage(message: string, isSuccess: boolean): void {
    this.pengajuanAlertMessage = message;
    this.showPengajuanAlert = true;

    setTimeout(() => {
      this.showPengajuanAlert = false;
    }, 1000);
  }
}
