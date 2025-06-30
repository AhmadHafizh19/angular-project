import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPengajuan } from './form-pengajuan';

describe('FormPengajuan', () => {
  let component: FormPengajuan;
  let fixture: ComponentFixture<FormPengajuan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPengajuan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPengajuan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
