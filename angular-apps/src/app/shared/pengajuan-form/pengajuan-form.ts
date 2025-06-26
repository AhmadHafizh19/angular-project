import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { creditur } from '../../../model/creditur';

@Component({
  selector: 'app-pengajuan-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pengajuan-form.html',
  styleUrl: './pengajuan-form.scss'
})
export class PengajuanForm {
  @Input() crediturList: creditur[] = [];
  @Output() submitPengajuan = new EventEmitter<{nama: string, jumlahPinjaman: number, tenor: number}>();

  selectedNama: string = '';
  jumlahPinjaman: number = 0;
  selectedTenor: number = 12;

  tenorOptions = [12, 24, 36, 48];

  onSubmit(): void {
    if (this.selectedNama && this.jumlahPinjaman > 0) {
      this.submitPengajuan.emit({
        nama: this.selectedNama,
        jumlahPinjaman: this.jumlahPinjaman,
        tenor: this.selectedTenor
      });
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.selectedNama = '';
    this.jumlahPinjaman = 0;
    this.selectedTenor = 12;
  }
}
