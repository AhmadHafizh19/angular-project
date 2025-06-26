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

    if (!creditur) {
      return { success: false, message: 'Creditur tidak ditemukan' };
    }

    if (creditur.creditScore < 60) {
      return { success: false, message: 'Skor kredit kurang' };
    }

    const newPengajuan: PengajuanPinjaman = {
      id: this.nextId++,
      nama: nama,
      jumlahPinjaman: jumlahPinjaman,
      tenor: tenor
    };

    this.pengajuanData.push(newPengajuan);
    return { success: true, message: 'Pengajuan berhasil ditambahkan' };
  }

  deletePengajuan(pengajuanToDelete: PengajuanPinjaman): PengajuanPinjaman[] {
    this.pengajuanData = this.pengajuanData.filter(p => p.id !== pengajuanToDelete.id);
    return this.pengajuanData;
  }
}
