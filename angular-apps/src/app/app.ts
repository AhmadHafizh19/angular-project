import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PengajuanPinjamanService } from './services/pengajuan-pinjaman/pengajuan-pinjaman';
import { ApiService } from './services/api/api';
import { DataSharingService } from './services/data-sharing/data-sharing';


@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [PengajuanPinjamanService, ApiService, DataSharingService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected readonly title = 'angular-apps';

  // Alert for Creditur operations
  crediturAlertMessage: string = '';
  showCrediturAlert: boolean = false;

  // Alert for Pengajuan operations
  pengajuanAlertMessage: string = '';
  showPengajuanAlert: boolean = false;
  pengajuanAlertIsSuccess: boolean = true;

  constructor(
    private pengajuanService: PengajuanPinjamanService,
    private apiService: ApiService,
    private dataSharingService: DataSharingService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInitialData();

    // Subscribe to alerts
    this.dataSharingService.crediturAlert$.subscribe(alert => {
      this.crediturAlertMessage = alert.message;
      this.showCrediturAlert = alert.show;
      this.cdRef.detectChanges();
    });

    this.dataSharingService.pengajuanAlert$.subscribe(alert => {
      this.pengajuanAlertMessage = alert.message;
      this.showPengajuanAlert = alert.show;
      this.pengajuanAlertIsSuccess = alert.isSuccess;
      this.cdRef.detectChanges();
    });
  }

  private loadInitialData(): void {
    // Load creditur data directly using ApiService
    this.loadCrediturData();

    // Load pengajuan data
    const pengajuanData = this.pengajuanService.getPengajuanData();
    this.dataSharingService.setPengajuanData(pengajuanData);
  }

  private loadCrediturData(): void {
    this.apiService.getData().subscribe({
      next: (data: any) => {
        this.dataSharingService.setCrediturData(data);
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error loading creditur data:', error);
        this.dataSharingService.showCrediturAlert('Gagal memuat data creditur');
      }
    });
  }
}
