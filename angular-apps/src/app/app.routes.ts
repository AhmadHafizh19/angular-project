import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormCreditur } from './pages/form-creditur/form-creditur';
import { FormPengajuan } from './pages/form-pengajuan/form-pengajuan';
import { ListPengajuan } from './pages/list-pengajuan/list-pengajuan';
import { DetailCreditur } from './pages/detail-creditur/detail-creditur';
import { DetailPengajuan } from './pages/detail-pengajuan/detail-pengajuan';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'form-creditur', component: FormCreditur },
  { path: 'form-pengajuan', component: FormPengajuan },
  { path: 'list-pengajuan', component: ListPengajuan },
  { path: 'detail-creditur/:id', component: DetailCreditur },
  { path: 'detail-pengajuan/:id', component: DetailPengajuan },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '/404' }
];
