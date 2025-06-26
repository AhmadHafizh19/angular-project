import { Injectable } from '@angular/core';
import { creditur } from '../../../model/creditur';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrediturDataService {
  private crediturDataSubject = new BehaviorSubject<creditur[]>([]);
  public crediturData$ = this.crediturDataSubject.asObservable();

  private generateRandomScore(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  private data: creditur[] = [
    { id: 1, name: "Dr. Levi Russel", age: 96, job: "Direct Data Producer", creditScore: 85 },
    { id: 2, name: "Jimmy Gusikowski", age: 59, job: "Chief Quality Supervisor", creditScore: 72 },
    { id: 3, name: "Mandy Hartmann II", age: 29, job: "Senior Response Assistant", creditScore: 45 },
    { id: 4, name: "Naomi Marvin", age: 69, job: "District Assurance Agent", creditScore: 91 },
    { id: 5, name: "Abraham Stanton", age: 93, job: "National Creative Coordinator", creditScore: 63 }
  ];

  constructor() { }

  getData(): creditur[] {
    return this.data;
  }

  addCreditur(newCreditur: Omit<creditur, 'id' | 'creditScore'>): creditur[] {
    // Generate new ID
    const newId = this.data.length > 0 ? Math.max(...this.data.map(c => c.id)) + 1 : 1;

    // Generate random credit score for new creditur
    const crediturWithIdAndScore: creditur = {
      id: newId,
      ...newCreditur,
      creditScore: this.generateRandomScore()
    };

    this.data.push(crediturWithIdAndScore);
    return this.data;
  }

  deleteCreditur(crediturToDelete: creditur): creditur[] {
    this.data = this.data.filter(c =>
      !(c.name === crediturToDelete.name &&
        c.age === crediturToDelete.age &&
        c.job === crediturToDelete.job)
    );
    return this.data;
  }
}
