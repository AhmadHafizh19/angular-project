import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PengajuanForm } from '../../shared/pengajuan-form/pengajuan-form';
import { creditur } from '../../../model/creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { PengajuanPinjamanService } from '../../services/pengajuan-pinjaman/pengajuan-pinjaman';

@Component({
  selector: 'app-form-pengajuan',
  imports: [CommonModule, PengajuanForm],
  templateUrl: './form-pengajuan.html',
  styleUrl: './form-pengajuan.scss'
})
export class FormPengajuan implements OnInit {
  crediturList: creditur[] = [];

  constructor(
    private dataSharingService: DataSharingService,
    private pengajuanService: PengajuanPinjamanService
  ) {}

  ngOnInit(): void {
    this.dataSharingService.crediturData$.subscribe(data => {
      this.crediturList = data;
    });
  }

  onSubmitPengajuan(pengajuanData: {nama: string, jumlahPinjaman: number, tenor: number}): void {
    const result = this.pengajuanService.addPengajuan(
      pengajuanData.nama,
      pengajuanData.jumlahPinjaman,
      pengajuanData.tenor,
      this.dataSharingService.getCrediturData()
    );

    // Tampilkan alert berdasarkan hasil pengajuan
    this.dataSharingService.showPengajuanAlert(result.message, result.success);

    // Refresh pengajuan data
    this.dataSharingService.refreshPengajuanData(this.pengajuanService);
  }
}
