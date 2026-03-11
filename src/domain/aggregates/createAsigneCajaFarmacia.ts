import { CajaAsigneEquipoEntity } from "../entities/cajaAsigneEquipo.ts";
import type { CajaFarmaciaEntity } from "../entities/cajaFarmacia.ts";
import type { PcEntity } from "../entities/pc.ts";

export class CreateAsigneCajaFarmaciaAggregate {

    private asigne: CajaAsigneEquipoEntity;

    constructor(
        private caja: CajaFarmaciaEntity,
        private equipo: PcEntity,
    ){
        const cajaPrimtive = caja.toValue();
        const equipoPrimitive = equipo.toValue();
    
        this.asigne = CajaAsigneEquipoEntity.build({
            id: 1,
            id_equipo: equipoPrimitive.id,
            name_farmacia: equipoPrimitive.name_farmacia,
            id_farmacia: equipoPrimitive.id_farmacia,
            resum_equipo: `
                Sistema operativo ${equipoPrimitive.so} con ${equipoPrimitive.ram} de ram
                y espacio de ${equipoPrimitive.rom_size}
            `.trim(),
            observacion_asignacion: `
            Caja numero #${cajaPrimtive.nm_caja} asignada al area de ${cajaPrimtive.area}
            `.trim(),
        });
    }

    getAsigne = () => this.asigne;
}