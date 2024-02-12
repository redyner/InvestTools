import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InvestimentoService {

  constructor() { }

    async Calcular(request) {
        let response = {
            Total: request.inicial,
            Investimento: 0,
            Juros: 0,
            RendaMensal: 0
        };

        this.AplicaAportesETaxaPorPeriodo(request, response);

        this.AjusteCasasDecimais(response);

        return response;
    }

    AplicaAportesETaxaPorPeriodo(request, response) {
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

            response.Juros += response.Total * request.juros.valor;

            response.Total *= 1 + request.juros.valor;

            if (mesAtual === 12)
                mesAtual = 0;

            mesAtual++;
        }

        response.RendaMensal = response.Total * request.juros.valor;
    }

    AdicionarAporte(response, valor) {
        response.Total += valor;
        response.Investimento += valor;
    }

    CalculaTaxa(juros) {
        if (juros.tipoPeriodo === 2)
            juros.valor = juros.valor / 12 / 100;
        else
            juros.valor /= 100;
    }

    CalculaPeriodo(periodo) {
        if (periodo.tipoPeriodo === 2)
            periodo.valor *= 12;
    }

    AjusteCasasDecimais(response) {
        response.Total = Math.round(response.Total * 100) / 100;
        response.Juros = Math.round(response.Juros * 100) / 100;
        response.Investimento = Math.round(response.Investimento * 100) / 100;
        response.RendaMensal = Math.round(response.RendaMensal * 100) / 100;
    }
}

