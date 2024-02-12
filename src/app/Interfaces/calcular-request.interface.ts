import { Aporte } from "./aporte.interface";
import { Juros } from "./juros.interface";
import { Periodo } from "./periodo.interface";

export interface CalcularRequest{
inicial: number;
aportes: Aporte[];
periodo: Periodo | undefined;
juros: Juros | undefined;
}