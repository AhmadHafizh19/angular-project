import { TestBed } from '@angular/core/testing';

import { PengajuanPinjaman } from './pengajuan-pinjaman';

describe('PengajuanPinjaman', () => {
  let service: PengajuanPinjaman;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PengajuanPinjaman);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
