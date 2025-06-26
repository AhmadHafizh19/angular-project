import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengajuanTable } from './pengajuan-table';


describe('PengajuanTableTable', () => {
  let component: PengajuanTable;
  let fixture: ComponentFixture<PengajuanTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengajuanTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
