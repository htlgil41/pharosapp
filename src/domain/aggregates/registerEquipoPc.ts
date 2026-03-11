import type { FarmaciaEntity } from "../entities/farmacia.ts";
import { InventarioGeneralEntity } from "../entities/inventarioGeneral.ts";
import type { PcEntity } from "../entities/pc.ts";

export class RegisterEquipoPcFarmaciaAggregate {

    private inventario: InventarioGeneralEntity;

    constructor(
        private farmacia: FarmaciaEntity,
        private pc: PcEntity,
        private cantidadSameEquipo: number,
    ) {

        const farmarmaciaPrimitive = farmacia.toValue();
        const pcPrimitive = pc.toValue();
        this.inventario = InventarioGeneralEntity.build({
            id: 1,
            id_farmacia: farmarmaciaPrimitive.id,
            name_farmacia: farmarmaciaPrimitive.name_farmcia,
            hardware: `PC con ${pcPrimitive.ram} de RAM y ${pcPrimitive.rom_size} de memoria con disco ${pcPrimitive.disk}`,
            nota: `Nota de ingreso para ${farmarmaciaPrimitive.name_farmcia} - Eqiupo de escritorio o laptop`,
            cantidad: cantidadSameEquipo <= 0 ? 1 : cantidadSameEquipo,
            fechaadd: ''
        });
    }

    getInventario = () => this.inventario;
    getEquipo = () => this.pc;
}