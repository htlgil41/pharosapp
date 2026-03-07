import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { IncidenciasPc } from "../interfaces/repontes.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class IncidenciasPcEntityt implements EntityPrimitive<IncidenciasPc>{

    constructor(
        private incidencia: IncidenciasPc
    ){

        if (
            this.incidencia.id <= 0 ||
            (
                this.incidencia.id_farmacia &&
                this.incidencia.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain()
    }

    static build(incidencia: IncidenciasPc): IncidenciasPcEntityt{
        return  new IncidenciasPcEntityt(incidencia);
    }

    setId(id: number): void{
     
        if (id <= 0) throw new InvalidIdExceptionDomain();
        this.incidencia.id = id;
    }

    toValue(): IncidenciasPc {
        return this.incidencia;
    }
}