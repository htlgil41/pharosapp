import type { FarmaciaEntity } from "../entities/farmacia.ts";
import type { ImpresoraEntity } from "../entities/impresora.ts";
import { InventarioGeneralEntity } from "../entities/inventarioGeneral.ts";
import type { PuntoVentaEntity } from "../entities/puntoVenta.ts";

export class RegisterPuntoVentaFarmaciaAggregate {

    private inventario: InventarioGeneralEntity;

    constructor(
        private farmacia: FarmaciaEntity,
        private punto: PuntoVentaEntity,
        private cantidadSameEquipo: number,
    ) {

        const farmarmaciaPrimitive = farmacia.toValue();
        const puntoPrimitive = punto.toValue();
        this.inventario = InventarioGeneralEntity.build({
            id: 1,
            id_farmacia: farmarmaciaPrimitive.id,
            name_farmacia: farmarmaciaPrimitive.name_farmcia,
            hardware: `${puntoPrimitive.banco} punto de venta modelo ${puntoPrimitive.modelo} serial ${puntoPrimitive.serial_code}`,
            nota: `Nota de ingreso para ${farmarmaciaPrimitive.name_farmcia} - Punto de venta modelo ${puntoPrimitive.serial_code}/${puntoPrimitive.modelo} de ${puntoPrimitive.banco}`,
            cantidad: cantidadSameEquipo <= 0 ? 1 : cantidadSameEquipo,
        });
    }

    getInventario = () => this.inventario;
    getEquipo = () => this.punto;
}