import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreditur } from './form-creditur';

describe('FormCreditur', () => {
  let component: FormCreditur;
  let fixture: ComponentFixture<FormCreditur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreditur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreditur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
