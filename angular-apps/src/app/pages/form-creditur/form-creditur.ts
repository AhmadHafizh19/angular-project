import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../shared/form/form';
import { creditur } from '../../../model/creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';
import { ApiService } from '../../services/api/api';

@Component({
  selector: 'app-form-creditur',
  imports: [CommonModule, FormComponent],
  templateUrl: './form-creditur.html',
  styleUrl: './form-creditur.scss'
})
export class FormCreditur {
  constructor(
    private dataSharingService: DataSharingService,
    private apiService: ApiService
  ) {}

  onAddCreditur(newCreditur: Omit<creditur, 'id' | 'creditScore'>): void {
    const crediturData = {
      ...newCreditur,
      creditScore: Math.floor(Math.random() * 100) + 1
    };

    this.apiService.addData(crediturData).subscribe({
      next: (response: any) => {
        // Refresh data setelah add
        this.dataSharingService.refreshCrediturData(this.apiService);
        this.dataSharingService.showCrediturAlert('Creditur berhasil ditambahkan');
      },
      error: (error) => {
        console.error('Error adding creditur:', error);
        this.dataSharingService.showCrediturAlert('Gagal menambahkan creditur');
      }
    });
  }
}
