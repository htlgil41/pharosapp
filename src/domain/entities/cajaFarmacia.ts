import { cajaFarmaciaNumInvalidExceptionDomain } from "../exceptions/cajaFarmaciaNumInvalid.ts";
import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { CajaFarmacia } from "../interfaces/farmacia.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class CajaFarmaciaEntity implements EntityPrimitive<CajaFarmacia>{
    
    constructor(
        private caja: CajaFarmacia
    ){

        if (
            this.caja.id <= 0 || 
            this.caja.id_farmacia <= 0
        ) throw new InvalidIdExceptionDomain()
        if (this.caja.nm_caja <= 0) throw new cajaFarmaciaNumInvalidExceptionDomain();
    }

    static build(caja: CajaFarmacia): CajaFarmaciaEntity {
        return new CajaFarmaciaEntity(caja);
    }

    toValue(): CajaFarmacia {
        return this.caja;
    }
}