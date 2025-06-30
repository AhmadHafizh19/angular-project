import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PengajuanTable } from '../../shared/pengajuan-table/pengajuan-table';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjamanService } from '../../services/pengajuan-pinjaman/pengajuan-pinjaman';

@Component({
  selector: 'app-list-pengajuan',
  imports: [CommonModule, PengajuanTable],
  templateUrl: './list-pengajuan.html',
  styleUrl: './list-pengajuan.scss'
})
export class ListPengajuan implements OnInit {
  pengajuanData: PengajuanPinjaman[] = [];

  constructor(
    private dataSharingService: DataSharingService,
    private pengajuanService: PengajuanPinjamanService
  ) {}

  ngOnInit(): void {
    this.dataSharingService.pengajuanData$.subscribe(data => {
      this.pengajuanData = data;
    });
  }

  onDeletePengajuan(pengajuan: PengajuanPinjaman): void {
    if (confirm(`Apakah Anda yakin ingin menghapus pengajuan dari ${pengajuan.nama}?`)) {
      this.pengajuanService.deletePengajuan(pengajuan);
      // Refresh data setelah delete
      this.dataSharingService.refreshPengajuanData(this.pengajuanService);
      this.dataSharingService.showPengajuanAlert('Pengajuan berhasil dihapus');
    }
  }
}
