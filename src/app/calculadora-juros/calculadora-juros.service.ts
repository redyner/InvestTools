import { Injectable } from '@angular/core';
import { CalcularResponse } from '../Interfaces/calcular-response.interface';
import { CalcularRequest } from '../Interfaces/calcular-request.interface';
import { Juros } from '../Interfaces/juros.interface';
import { Periodo } from '../Interfaces/periodo.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraJurosService {

  constructor(){}

  Calcular(request: CalcularRequest): CalcularResponse {

    let response: CalcularResponse = {
      total: request.inicial,
      investimento: 0,
      juros: 0,
      rendaMensal: 0
      };

      this.AplicaAportesETaxaPorPeriodo(request, response);

      this.AjusteCasasDecimais(response);

      return response;
  }

  AplicaAportesETaxaPorPeriodo(request: CalcularRequest, response: CalcularResponse) {
    if ((request.periodo !== null && request.periodo !== undefined) && 
        (request.periodo.valor !== null && request.periodo.valor !== undefined) &&
        (request.juros !== null && request.juros !== undefined) && 
        (request.juros.valor !== null && request.juros.valor !== undefined)) {
      let mesAtual = new Date().getMonth() + 1;

      this.CalculaPeriodo(request.periodo);
      this.CalculaTaxa(request.juros);

      let aporteMensal = request.aportes.find(a => a.mes === 0);

        for (let i = 1; i <= request.periodo.valor; i++) {
            let aporte = request.aportes.find(a => a.mes === mesAtual);

            if (aporte)
                this.AdicionarAporte(response, aporte.valor);
            else if (aporteMensal)
                this.AdicionarAporte(response, aporteMensal.valor);

            if (request.juros.valor !== null && request.juros.valor !== undefined) {
            response.juros += response.total * request.juros.valor;

            response.total *= 1 + request.juros.valor;
            }

            if (mesAtual === 12)
                mesAtual = 0;

            mesAtual++;        
      }

      response.rendaMensal = response.total * request.juros.valor;
    }
  }

  AdicionarAporte(response : CalcularResponse, valor: number) {
      response.total += valor;
      response.investimento += valor;
  }

  CalculaTaxa(juros : Juros) {
    if (juros.valor !== null && juros.valor !== undefined) {
        if (juros.tipoPeriodo === 2)
            juros.valor = juros.valor / 12 / 100;
        else
            juros.valor /= 100;
    }
}


  CalculaPeriodo(periodo: Periodo) {
      if (periodo.tipoPeriodo === 2 && periodo.valor !== null && periodo.valor !== undefined)
          periodo.valor *= 12;
  }

  AjusteCasasDecimais(response: CalcularResponse) {
      response.total = Math.round(response.total * 100) / 100;
      response.juros = Math.round(response.juros * 100) / 100;
      response.investimento = Math.round(response.investimento * 100) / 100;
      response.rendaMensal = Math.round(response.rendaMensal * 100) / 100;
  }

}