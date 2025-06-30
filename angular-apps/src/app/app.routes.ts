import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormCreditur } from './pages/form-creditur/form-creditur';
import { FormPengajuan } from './pages/form-pengajuan/form-pengajuan';
import { ListPengajuan } from './pages/list-pengajuan/list-pengajuan';
import { DetailCreditur } from './pages/detail-creditur/detail-creditur';
import { DetailPengajuan } from './pages/detail-pengajuan/detail-pengajuan';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'form-creditur', component: FormCreditur, canActivate: [AuthGuard] },
  { path: 'form-pengajuan', component: FormPengajuan, canActivate: [AuthGuard] },
  { path: 'list-pengajuan', component: ListPengajuan, canActivate: [AuthGuard] },
  { path: 'detail-creditur/:id', component: DetailCreditur, canActivate: [AuthGuard] },
  { path: 'detail-pengajuan/:id', component: DetailPengajuan, canActivate: [AuthGuard] },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '/404' }
];
