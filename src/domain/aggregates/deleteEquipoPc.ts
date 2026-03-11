import { InventarioGeneralEntity } from "../entities/inventarioGeneral.ts";
import type { PcEntity } from "../entities/pc.ts";

export class DeleteEquipoPcAggregate {

    private inventario: InventarioGeneralEntity;

    constructor(
        private equipo: PcEntity,
        notaInve: string
    ){
        const equipoPrimitive = equipo.toValue();
        this.inventario = InventarioGeneralEntity.build({
            id: 1,
            id_farmacia: equipoPrimitive.id_farmacia,
            name_farmacia: equipoPrimitive.name_farmacia,
            hardware: `PC con ${equipoPrimitive.ram} de RAM y ${equipoPrimitive.rom_size} de memoria con disco ${equipoPrimitive.disk}`.trim(),
            nota: `Nota de salida para ${equipoPrimitive.name_farmacia} - Eqiupo de escritorio o laptop [${notaInve}]`.trim(),
            cantidad: 1 * -1,
            fechaadd: '',
        });
    }

    getInventario = () => this.inventario;
    getEquipo = () => this.equipo;
}