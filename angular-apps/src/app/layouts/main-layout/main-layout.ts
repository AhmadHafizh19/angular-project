import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Database Management System</h1>
        <nav class="navigation">
          <a routerLink="/home" routerLinkActive="active">Home</a>
          <a routerLink="/form-creditur" routerLinkActive="active">Form Kreditur</a>
          <a routerLink="/form-pengajuan" routerLinkActive="active">Form Pengajuan</a>
          <a routerLink="/list-pengajuan" routerLinkActive="active">List Pengajuan</a>
        </nav>
      </header>

      <!-- Router Outlet -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './main-layout.scss'
})
export class MainLayout {}
