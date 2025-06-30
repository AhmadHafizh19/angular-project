import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { creditur } from '../../../model/creditur';
import { DataSharingService } from '../../services/data-sharing/data-sharing';

@Component({
  selector: 'app-detail-creditur',
  imports: [CommonModule],
  templateUrl: './detail-creditur.html',
  styleUrl: './detail-creditur.scss'
})
export class DetailCreditur implements OnInit {
  creditur: creditur | undefined;
  crediturId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.crediturId = params['id'];
      this.loadCrediturDetail();
    });

    // Subscribe to data changes
    this.dataSharingService.crediturData$.subscribe(() => {
      if (this.crediturId) {
        this.loadCrediturDetail();
      }
    });
  }

  private loadCrediturDetail(): void {
    if (this.crediturId) {
      this.creditur = this.dataSharingService.getCrediturById(this.crediturId);
      if (!this.creditur) {
        this.router.navigate(['/404']);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
