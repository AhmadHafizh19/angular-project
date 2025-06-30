import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';

@Component({
  selector: 'app-pengajuan-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pengajuan-table.html',
  styleUrl: './pengajuan-table.scss'
})
export class PengajuanTable {
  @Input() pengajuanData: PengajuanPinjaman[] = [];
  @Output() deletePengajuan = new EventEmitter<PengajuanPinjaman>();

  constructor(private router: Router) {}

  get hasData(): boolean {
    return this.pengajuanData.length > 0;
  }

  deletePengajuanItem(pengajuan: PengajuanPinjaman): void {
    this.deletePengajuan.emit(pengajuan);
  }

  viewDetail(pengajuan: PengajuanPinjaman): void {
    this.router.navigate(['/detail-pengajuan', pengajuan.id]);
  }
}
