import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { CajasAsignePuntoVenta } from "../interfaces/farmacia.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class CajaAsignePuntoEntity implements EntityPrimitive<CajasAsignePuntoVenta> {

    constructor(
        private cajaAsigne: CajasAsignePuntoVenta
    ){

        if(
            this.cajaAsigne.id <= 0 ||
            this.cajaAsigne.id_punto_venta <= 0 ||
            (
                this.cajaAsigne.id_farmacia &&
                this.cajaAsigne.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain();
    }

    static build(asigne: CajasAsignePuntoVenta): CajaAsignePuntoEntity {
        return new CajaAsignePuntoEntity(asigne);
    }

    toValue(): CajasAsignePuntoVenta {
        return this.cajaAsigne;    
    }
}