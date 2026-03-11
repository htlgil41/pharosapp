import { InventarioGeneralEntity } from "../entities/inventarioGeneral.ts";
import type { PuntoVentaEntity } from "../entities/puntoVenta.ts";

export class DeleteEquipoPuntoVentaAggregate {

    private inventario: InventarioGeneralEntity;

    constructor(
        private equipo: PuntoVentaEntity,
        notaInve: string
    ){
        const equipoPrimitive = equipo.toValue();
        this.inventario = InventarioGeneralEntity.build({
            id: 1,
            id_farmacia: equipoPrimitive.id_farmacia,
            name_farmacia: equipoPrimitive.name_farmacia,
            hardware: `${equipoPrimitive.banco} punto de venta modelo ${equipoPrimitive.modelo} serial ${equipoPrimitive.serial_code}`,
            nota: `Nota de salida para ${equipoPrimitive.name_farmacia} - Punto de venta modelo ${equipoPrimitive.serial_code}/${equipoPrimitive.modelo} de ${equipoPrimitive.banco} [${notaInve}]`.trim(),
            cantidad: 1 * -1,
            fechaadd: '',
        });
    }

    getInventario = () => this.inventario;
    getEquipo = () => this.equipo;
}