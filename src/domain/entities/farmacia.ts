import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { Farmacia } from "../interfaces/farmacia.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class FarmaciaEntity implements EntityPrimitive<Farmacia>{
    
    constructor(
        private farmacia: Farmacia
    ){

        if (this.farmacia.id <= 0) throw new InvalidIdExceptionDomain();
    }

    static build(farmacia: Farmacia): FarmaciaEntity {
        return new FarmaciaEntity(farmacia);
    }

    toValue(): Farmacia {
        return this.farmacia;
    }
}