import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import { RifInvalidException } from "../exceptions/rifInvalid.ts";
import type { Farmacia } from "../interfaces/farmacia.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class FarmaciaEntity implements EntityPrimitive<Farmacia>{
    
    constructor(
        private farmacia: Farmacia
    ){

        if (this.farmacia.id <= 0) throw new InvalidIdExceptionDomain();
        if (!/^[JGVPEjgvpe][-]?\d{8,9}(?:[-]?\d)?$/.test(this.farmacia.rif))
                throw new RifInvalidException();
    }

    static build(farmacia: Farmacia): FarmaciaEntity {
        return new FarmaciaEntity(farmacia);
    }

    setId(id: number): void{
     
        if (id <= 0) throw new InvalidIdExceptionDomain();
        this.farmacia.id = id;
    }
    

    toValue(): Farmacia {
        return this.farmacia;
    }
}