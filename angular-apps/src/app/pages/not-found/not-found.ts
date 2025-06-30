import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class NotFound implements OnInit {
  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Hide the main app layout
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }

  ngOnDestroy(): void {
    // Restore the main app layout
    document.body.style.margin = '';
    document.body.style.padding = '';
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.location.back();
  }
}
