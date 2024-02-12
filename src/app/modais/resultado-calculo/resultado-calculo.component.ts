import { Component, Inject } from '@angular/core';
import { CalcularResponse } from '../../Interfaces/calcular-response.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resultado-calculo',
  templateUrl: './resultado-calculo.component.html',
  styleUrl: './resultado-calculo.component.scss'
})
export class ResultadoCalculoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CalcularResponse) {}
}
