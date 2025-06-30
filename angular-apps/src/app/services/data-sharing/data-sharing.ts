import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { creditur } from '../../../model/creditur';
import { PengajuanPinjaman } from '../../../model/pengajuan-pinjaman';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private crediturDataSubject = new BehaviorSubject<creditur[]>([]);
  private pengajuanDataSubject = new BehaviorSubject<PengajuanPinjaman[]>([]);

  // Alert messages
  private crediturAlertSubject = new BehaviorSubject<{message: string, show: boolean}>({message: '', show: false});
  private pengajuanAlertSubject = new BehaviorSubject<{message: string, show: boolean, isSuccess: boolean}>({message: '', show: false, isSuccess: true});

  crediturData$ = this.crediturDataSubject.asObservable();
  pengajuanData$ = this.pengajuanDataSubject.asObservable();
  crediturAlert$ = this.crediturAlertSubject.asObservable();
  pengajuanAlert$ = this.pengajuanAlertSubject.asObservable();

  setCrediturData(data: creditur[]): void {
    this.crediturDataSubject.next(data);
  }

  setPengajuanData(data: PengajuanPinjaman[]): void {
    this.pengajuanDataSubject.next(data);
  }

  getCrediturData(): creditur[] {
    return this.crediturDataSubject.value;
  }

  getPengajuanData(): PengajuanPinjaman[] {
    return this.pengajuanDataSubject.value;
  }

  getCrediturById(id: string | number): creditur | undefined {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.crediturDataSubject.value.find(c => c.id === numId);
  }

  getPengajuanById(id: string | number): PengajuanPinjaman | undefined {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.pengajuanDataSubject.value.find(p => p.id === numId);
  }

  showCrediturAlert(message: string): void {
    this.crediturAlertSubject.next({message, show: true});
    setTimeout(() => {
      this.crediturAlertSubject.next({message: '', show: false});
    }, 3000);
  }

  showPengajuanAlert(message: string, isSuccess: boolean = true): void {
    this.pengajuanAlertSubject.next({message, show: true, isSuccess});
    setTimeout(() => {
      this.pengajuanAlertSubject.next({message: '', show: false, isSuccess: true});
    }, 3000);
  }

  // Method untuk reload data
  refreshCrediturData(apiService: any): void {
    apiService.getData().subscribe({
      next: (data: any) => {
        this.setCrediturData(data);
      },
      error: (error: any) => {
        console.error('Error refreshing creditur data:', error);
        this.showCrediturAlert('Gagal memuat ulang data creditur');
      }
    });
  }

  refreshPengajuanData(pengajuanService: any): void {
    const data = pengajuanService.getPengajuanData();
    this.setPengajuanData(data);
  }
}
