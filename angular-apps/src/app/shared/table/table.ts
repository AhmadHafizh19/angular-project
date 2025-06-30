import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { creditur } from '../../../model/creditur';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() childrenData: creditur[] = [];
  @Output() deleteCrediturEvent = new EventEmitter<creditur>();

  constructor(private router: Router) {}

  get hasData(): boolean {
    return this.childrenData.length > 0;
  }

  deleteCreditur(creditur: creditur): void {
    this.deleteCrediturEvent.emit(creditur);
  }

  viewDetail(creditur: creditur): void {
    this.router.navigate(['detail-creditur/', creditur.id]);
  }
}
