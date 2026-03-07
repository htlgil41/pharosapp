import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { InventarioGeneral } from "../interfaces/equipos.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class InventarioGeneralEntity implements EntityPrimitive<InventarioGeneral> {

    constructor(
        private inventario: InventarioGeneral
    ) {

        if (
            this.inventario.id <= 0 ||
            (
                this.inventario.id_farmacia &&
                this.inventario.id_farmacia <= 0
            )
        ) throw new InvalidIdExceptionDomain();
    }

    static build(inventario: InventarioGeneral): InventarioGeneralEntity{
        return new InventarioGeneralEntity(inventario);
    }

    setId(id: number): void{
     
        if (id <= 0) throw new InvalidIdExceptionDomain();
        this.inventario.id = id;
    }

    toValue(): InventarioGeneral {
        
        return this.inventario;
    }
}