import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { PuntoVenta } from "../interfaces/equipos.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class PuntoVentaEntity implements EntityPrimitive<PuntoVenta>{

    constructor(
        private punto: PuntoVenta
    ){

        if (
            this.punto.id <= 0 ||
            (
                this.punto.id_farmacia &&
                this.punto.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain();
    }

    static build(punto: PuntoVenta): PuntoVentaEntity{
        return new PuntoVentaEntity(punto);
    }

    setId(id: number): void{
     
        if (id <= 0) throw new InvalidIdExceptionDomain();
        this.punto.id = id;
    }

    toValue(): PuntoVenta {
        return this.punto;
    }
}