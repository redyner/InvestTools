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
        (request.juros !== null && request.juros !== undefined)) {

      let mesAtual = new Date().getMonth() + 1;

      const periodo = this.CalculaPeriodo(request.periodo);
      const juros = this.CalculaTaxa(request.juros);

      let aporteMensal = request.aportes.find(a => a.mes === 0);

        for (let i = 1; i <= periodo; i++) {
            let aporte = request.aportes.find(a => a.mes === mesAtual);

            if (aporte)
                this.AdicionarAporte(response, aporte.valor);
            else if (aporteMensal)
                this.AdicionarAporte(response, aporteMensal.valor);

            response.juros += response.total * juros;

            response.total *= 1 + juros;

            if (mesAtual === 12)
                mesAtual = 0;

            mesAtual++;        
      }

      response.rendaMensal = response.total * juros;
    }
  }

  AdicionarAporte(response : CalcularResponse, valor: number) {
      response.total += valor;
      response.investimento += valor;
  }

  CalculaTaxa(juros : Juros) : number{
    if (juros.valor !== null && juros.valor !== undefined) {
        if (juros.tipoPeriodo === 2)
            return juros.valor / 12 / 100;
        else
            return juros.valor / 100;
    }
    return 0;
}


  CalculaPeriodo(periodo: Periodo) : number {
      if (periodo.tipoPeriodo === 2 && periodo.valor !== null && periodo.valor !== undefined)
          return periodo.valor * 12;
      
      return periodo.valor ?? 0;
  }

  AjusteCasasDecimais(response: CalcularResponse) {
      response.total = Math.round(response.total * 100) / 100;
      response.juros = Math.round(response.juros * 100) / 100;
      response.investimento = Math.round(response.investimento * 100) / 100;
      response.rendaMensal = Math.round(response.rendaMensal * 100) / 100;
  }

}