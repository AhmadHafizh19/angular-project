import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPengajuan } from './detail-pengajuan';

describe('DetailPengajuan', () => {
  let component: DetailPengajuan;
  let fixture: ComponentFixture<DetailPengajuan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPengajuan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPengajuan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
