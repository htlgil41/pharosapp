import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { CajaAsigneEquipo } from "../interfaces/farmacia.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class CajaAsigneEquipoEntity implements EntityPrimitive<CajaAsigneEquipo> {

    constructor(
        private cajaAsigne: CajaAsigneEquipo
    ){

        if(
            this.cajaAsigne.id <= 0 ||
            this.cajaAsigne.id_equipo <= 0 ||
            (
                this.cajaAsigne.id_farmacia &&
                this.cajaAsigne.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain();
    }

    static build(asigne: CajaAsigneEquipo): CajaAsigneEquipoEntity {
        return new CajaAsigneEquipoEntity(asigne);
    }

    setId(id: number): void{
     
        if (id <= 0) throw new InvalidIdExceptionDomain();
        this.cajaAsigne.id = id;
    }

    toValue(): CajaAsigneEquipo {
        return this.cajaAsigne;    
    }
}