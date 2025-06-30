import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../../shared/table/table';
import { creditur } from '../../../model/creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { ApiService } from '../../services/api/api';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Table],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  crediturData: creditur[] = [];

  constructor(
    private dataSharingService: DataSharingService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.dataSharingService.crediturData$.subscribe(data => {
      this.crediturData = data;
    });
  }

  onDeleteCreditur(creditur: creditur): void {
    if (confirm(`Apakah Anda yakin ingin menghapus creditur ${creditur.name}?`)) {
      this.apiService.deleteData(creditur.id.toString()).subscribe({
        next: (response: any) => {
          // Refresh data setelah delete
          this.dataSharingService.refreshCrediturData(this.apiService);
          this.dataSharingService.showCrediturAlert('Creditur berhasil dihapus');
        },
        error: (error) => {
          console.error('Error deleting creditur:', error);
          this.dataSharingService.showCrediturAlert('Gagal menghapus creditur');
        }
      });
    }
  }
}
