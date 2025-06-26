import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  get hasData(): boolean {
    return this.childrenData.length > 0;
  }

  deleteCreditur(creditur: creditur): void {
    this.deleteCrediturEvent.emit(creditur);
  }
}