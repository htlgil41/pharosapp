import type { ImpresoraEntity } from "../entities/impresora.ts";
import { InventarioGeneralEntity } from "../entities/inventarioGeneral.ts";

export class DeleteEquipoImpresoraAggregate {

    private inventario: InventarioGeneralEntity;

    constructor(
        private equipo: ImpresoraEntity,
        notaInve: string
    ){
        const equipoPrimitive = equipo.toValue();
        this.inventario = InventarioGeneralEntity.build({
            id: 1,
            id_farmacia: equipoPrimitive.id_farmacia,
            name_farmacia: equipoPrimitive.name_farmacia,
            hardware: `Impresora ${equipoPrimitive.marca} modelo ${equipoPrimitive.modelo_print}`.trim(),
            nota: `Nota de salida para ${equipoPrimitive.name_farmacia} - Impresora ${equipoPrimitive.marca}/${equipoPrimitive.modelo_print} [${notaInve}]`.trim(),
            cantidad: 1 * -1,
            fechaadd: '',
        });
    }

    getInventario = () => this.inventario;
    getEquipo = () => this.equipo;
}