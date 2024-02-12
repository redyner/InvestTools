import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TipoPeriodo } from '../Enums/tipo-periodo';
import { Mes } from '../Enums/mes';
import { CalculadoraJurosService } from './calculadora-juros.service';
import { CalcularResponse } from '../Interfaces/calcular-response.interface';
import { Aporte } from '../Interfaces/aporte.interface';
import { CalcularRequest } from '../Interfaces/calcular-request.interface';
import { MatDialog } from '@angular/material/dialog';
import { ResultadoCalculoComponent } from '../modais/resultado-calculo/resultado-calculo.component';


@Component({
  selector: 'app-calculadora-juros',
  templateUrl: './calculadora-juros.component.html',
  styleUrls: ['./calculadora-juros.component.scss']
})

export class CalculadoraJurosComponent {

  calculoResponse: CalcularResponse | undefined;

  aportes: Aporte[] = [];

  meses = [
    { valor: 0,  nome: 'Mensal' },
    { valor: 1,  nome: 'Janeiro' },
    { valor: 2,  nome: 'Fevereiro' },
    { valor: 3,  nome: 'Março' },
    { valor: 4,  nome: 'Abril' },
    { valor: 5,  nome: 'Maio' },
    { valor: 6,  nome: 'Junho' },
    { valor: 7,  nome: 'Julho' },
    { valor: 8,  nome: 'Agosto' },
    { valor: 9,  nome: 'Setembro' },
    { valor: 10, nome:  'Outubro' },
    { valor: 11, nome:  'Novembro' },
    { valor: 12, nome:  'Dezembro' }
  ];

  form = this.formBuilder.group({
    inicial: [0, Validators.required],
    periodo: this.formBuilder.group({
      valor: [ 0, Validators.required],
      tipoPeriodo: [TipoPeriodo.mensal, Validators.required]
    }),
    juros: this.formBuilder.group({
      valor: [0, Validators.required],
      tipoPeriodo: [TipoPeriodo.mensal, Validators.required]
    }),
    aporte: this.formBuilder.group({
      valor: [0, Validators.required],
      mes: [Mes.mensal, Validators.required]
    })
  });


  constructor(private formBuilder: FormBuilder,  private calculadoraJurosService: CalculadoraJurosService, private dialog: MatDialog) { }

  calcular() {
    const inicial = parseFloat(this.form.get('inicial')?.value?.toString() ?? '0');

    const request: CalcularRequest = 
    { 
      inicial: inicial,
      aportes: this.aportes,
      periodo: this.form.get('periodo')?.value,
      juros: this.form.get('juros')?.value
    };

    this.calculoResponse  = this.calculadoraJurosService.Calcular(request);
    this.openDialog();  

  }

  addAporte() {
    let aporte: Aporte = {
      valor: this.form.get('aporte')?.value.valor ?? 0,
      mes:  this.form.get('aporte')?.value.mes ?? Mes.mensal
    };
    this.aportes.push(aporte);
  }

  removeAporte(index: number) {
    this.aportes.splice(index, 1);
  }

  getNomeMes(valor: number) : string{
    return this.meses.find(mes => mes.valor === valor)?.nome ?? "";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultadoCalculoComponent, {
      data: this.calculoResponse
    });
  }

}
