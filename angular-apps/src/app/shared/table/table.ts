import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { kreditur } from '../../../model/kreditur';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})

export class Table {
  @Input() childrenData: kreditur[] = [];
  @Output() deleteKrediturEvent = new EventEmitter<kreditur>();

  deleteKreditur(kreditur: kreditur): void {
    this.deleteKrediturEvent.emit(kreditur);
  }

  get hasData(): boolean {
    return this.childrenData.length > 0;
  }
}
