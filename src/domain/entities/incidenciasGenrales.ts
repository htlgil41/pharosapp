import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { IncidenciasGenerales } from "../interfaces/repontes.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class IncidenciasGeneralesEntityt implements EntityPrimitive<IncidenciasGenerales>{

    constructor(
        private incidencia: IncidenciasGenerales
    ){

        if (
            this.incidencia.id <= 0 ||
            (
                this.incidencia.id_farmacia &&
                this.incidencia.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain()
    }

    static build(incidencia: IncidenciasGenerales): IncidenciasGeneralesEntityt{
        return  new IncidenciasGeneralesEntityt(incidencia);
    }

    toValue(): IncidenciasGenerales {
        return this.incidencia;
    }
}