import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  get hasData(): boolean {
    return this.pengajuanData.length > 0;
  }

  deletePengajuanItem(pengajuan: PengajuanPinjaman): void {
    this.deletePengajuan.emit(pengajuan);
  }

}
