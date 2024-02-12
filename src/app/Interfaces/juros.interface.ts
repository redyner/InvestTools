import { TipoPeriodo } from "../Enums/tipo-periodo";

export interface Juros
{
    valor: number | null,
    tipoPeriodo: TipoPeriodo | null
}