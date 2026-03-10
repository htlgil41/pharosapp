import type { FarmaciaEntity } from "../entities/farmacia.ts";
import type { ImpresoraEntity } from "../entities/impresora.ts";
import { InventarioGeneralEntity } from "../entities/inventarioGeneral.ts";

export class RegisterEquipoImpresoraFarmaciaAggregate {

    private inventario: InventarioGeneralEntity;

    constructor(
        private farmacia: FarmaciaEntity,
        private impresora: ImpresoraEntity,
        private cantidadSameEquipo: number,
    ) {

        const farmarmaciaPrimitive = farmacia.toValue();
        const impresoraPrimitive = impresora.toValue();
        this.inventario = InventarioGeneralEntity.build({
            id: 1,
            id_farmacia: farmarmaciaPrimitive.id,
            name_farmacia: farmarmaciaPrimitive.name_farmcia,
            hardware: `Impresora ${impresoraPrimitive.marca} modelo ${impresoraPrimitive.modelo_print}`,
            nota: `Nota de ingreso para ${farmarmaciaPrimitive.name_farmcia} - Impresora ${impresoraPrimitive.marca}/${impresoraPrimitive.modelo_print}`,
            cantidad: cantidadSameEquipo <= 0 ? 1 : cantidadSameEquipo,
        });
    }

    getInventario = () => this.inventario;
    getEquipo = () => this.impresora;
}