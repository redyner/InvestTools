import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraJurosComponent } from './calculadora-juros.component';

describe('CalculadoraJurosComponent', () => {
  let component: CalculadoraJurosComponent;
  let fixture: ComponentFixture<CalculadoraJurosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculadoraJurosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraJurosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
