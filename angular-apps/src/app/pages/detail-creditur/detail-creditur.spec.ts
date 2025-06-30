import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCreditur } from './detail-creditur';

describe('DetailCreditur', () => {
  let component: DetailCreditur;
  let fixture: ComponentFixture<DetailCreditur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCreditur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCreditur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
