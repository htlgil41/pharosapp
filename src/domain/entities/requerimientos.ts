import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { Requerimientos } from "../interfaces/repontes.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class RequerimientosEntity implements EntityPrimitive<Requerimientos>{

    constructor(
        private req: Requerimientos
    ){

        if (
            this.req.id <= 0 ||
            (
                this.req.id_farmacia &&
                this.req.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain();
    }

    static build(req: Requerimientos): RequerimientosEntity{
        return new RequerimientosEntity(req);
    }

    toValue(): Requerimientos {
        return this.req;
    }
}