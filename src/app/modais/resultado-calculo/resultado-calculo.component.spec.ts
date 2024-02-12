import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoCalculoComponent } from './resultado-calculo.component';

describe('ResultadoCalculoComponent', () => {
  let component: ResultadoCalculoComponent;
  let fixture: ComponentFixture<ResultadoCalculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadoCalculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadoCalculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
