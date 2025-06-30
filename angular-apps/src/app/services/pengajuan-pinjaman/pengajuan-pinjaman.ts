import { Injectable } from '@angular/core';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';
import { creditur } from '../../../model/creditur';


@Injectable({
  providedIn: 'root'
})
export class PengajuanPinjamanService {

  private pengajuanData: PengajuanPinjaman[] = [];
  private nextId: number = 1;

  constructor() { }

  getPengajuanData(): PengajuanPinjaman[] {
    return this.pengajuanData;
  }

  addPengajuan(nama: string, jumlahPinjaman: number, tenor: number, crediturList: creditur[]): { success: boolean, message: string } {
    // Find creditur by name
    const creditur = crediturList.find(c => c.name === nama);

    let isApproved = false;
    let reason = '';

    if (!creditur) {
      isApproved = false;
      reason = 'Creditur tidak ditemukan dalam database';
    } else {
      isApproved = creditur.creditScore >= 60;
      reason = isApproved ? 'Pengajuan disetujui berdasarkan skor kredit' : 'Skor kredit tidak memenuhi syarat minimum (60)';
    }

    const newPengajuan: PengajuanPinjaman = {
      id: this.nextId++,
      nama: nama,
      jumlahPinjaman: jumlahPinjaman,
      tenor: tenor,
      disetujui: isApproved,
      alasan: reason,
      tanggalPengajuan: new Date()
    };

    this.pengajuanData.push(newPengajuan);

    if (isApproved) {
      return { success: true, message: 'Pengajuan berhasil ditambahkan dan disetujui' };
    } else {
      return { success: false, message: `Pengajuan ditambahkan tetapi ditolak: ${reason}` };
    }
  }

  deletePengajuan(pengajuanToDelete: PengajuanPinjaman): PengajuanPinjaman[] {
    this.pengajuanData = this.pengajuanData.filter(p => p.id !== pengajuanToDelete.id);
    return this.pengajuanData;
  }
}
