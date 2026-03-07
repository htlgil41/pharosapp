import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { EquipoPC } from "../interfaces/equipos.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class PcEntity implements EntityPrimitive<EquipoPC>{

    constructor(
        private pc: EquipoPC
    ){

        if (
            this.pc.id <= 0 ||
            (
                this.pc.id_farmacia &&
                this.pc.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain();
    }

    static build(pc: EquipoPC): PcEntity{
        return new PcEntity(pc);
    }

    setId(id: number): void{
     
        if (id <= 0) throw new InvalidIdExceptionDomain();
        this.pc.id = id;
    }

    toValue(): EquipoPC {
        return this.pc;
    }
}