import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { EquipoImpresora } from "../interfaces/equipos.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class ImpresoraEntity implements EntityPrimitive<EquipoImpresora>{

    constructor(
        private impresora: EquipoImpresora
    ){

        if (
            this.impresora.id <= 0 ||
            (
                this.impresora.id_farmacia &&
                this.impresora.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain();
    }

    static build(impresora: EquipoImpresora): ImpresoraEntity{
        return new ImpresoraEntity(impresora);
    }

    toValue(): EquipoImpresora {
        return this.impresora;
    }
}