import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengajuanForm } from './pengajuan-form';


describe('PengajuanForm', () => {
  let component: PengajuanForm;
  let fixture: ComponentFixture<PengajuanForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengajuanForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
