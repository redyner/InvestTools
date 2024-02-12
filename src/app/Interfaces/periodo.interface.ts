import { TipoPeriodo } from "../Enums/tipo-periodo";

export interface Periodo
{
    valor: number | null,
    tipoPeriodo: TipoPeriodo | null
}
