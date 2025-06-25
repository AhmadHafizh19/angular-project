import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from "./shared/table/table";
import { FormComponent } from './shared/form/form';
import { kreditur } from '../model/kreditur';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    Table,
    FormComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = 'angular-apps';

  krediturData: kreditur[] = [
    { name: "Dr. Levi Russel", age: 96, job: "Direct Data Producer" },
    { name: "Jimmy Gusikowski", age: 59, job: "Chief Quality Supervisor" },
    { name: "Mandy Hartmann II", age: 29, job: "Senior Response Assistant" },
    { name: "Naomi Marvin", age: 69, job: "District Assurance Agent" },
    { name: "Abraham Stanton", age: 93, job: "National Creative Coordinator" }
  ];

  onAddKreditur(newKreditur: kreditur): void {
    this.krediturData = [...this.krediturData, newKreditur];
  }

  onDeleteKreditur(krediturToDelete: kreditur): void {
    this.krediturData = this.krediturData.filter(k => 
      !(k.name === krediturToDelete.name && 
        k.age === krediturToDelete.age && 
        k.job === krediturToDelete.job)
    );
  }
}
