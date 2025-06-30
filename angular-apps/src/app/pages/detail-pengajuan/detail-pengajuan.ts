import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';
import { DataSharingService } from '../../services/data-sharing/data-sharing';

@Component({
  selector: 'app-detail-pengajuan',
  imports: [CommonModule],
  templateUrl: './detail-pengajuan.html',
  styleUrl: './detail-pengajuan.scss'
})
export class DetailPengajuan implements OnInit {
  pengajuan: PengajuanPinjaman | undefined;
  pengajuanId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pengajuanId = +params['id'];
      this.loadPengajuanDetail();
    });

    // Subscribe to data changes
    this.dataSharingService.pengajuanData$.subscribe(() => {
      if (this.pengajuanId) {
        this.loadPengajuanDetail();
      }
    });
  }

  private loadPengajuanDetail(): void {
    if (this.pengajuanId) {
      this.pengajuan = this.dataSharingService.getPengajuanById(this.pengajuanId);
      if (!this.pengajuan) {
        this.router.navigate(['/404']);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/list-pengajuan']);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  }
}
