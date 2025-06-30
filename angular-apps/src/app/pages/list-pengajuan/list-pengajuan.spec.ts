import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPengajuan } from './list-pengajuan';

describe('ListPengajuan', () => {
  let component: ListPengajuan;
  let fixture: ComponentFixture<ListPengajuan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPengajuan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPengajuan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
