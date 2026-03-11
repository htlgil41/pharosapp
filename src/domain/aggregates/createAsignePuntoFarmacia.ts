import { CajaAsigneEquipoEntity } from "../entities/cajaAsigneEquipo.ts";
import type { CajaFarmaciaEntity } from "../entities/cajaFarmacia.ts";
import type { PuntoVentaEntity } from "../entities/puntoVenta.ts";

export class CreateAsignePuntoFarmaciaAggregate {

    private asigne: CajaAsigneEquipoEntity;

    constructor(
        private caja: CajaFarmaciaEntity,
        private equipo: PuntoVentaEntity,
    ){
        const cajaPrimtive = caja.toValue();
        const equipoPrimitive = equipo.toValue();
    
        this.asigne = CajaAsigneEquipoEntity.build({
            id: 1,
            id_equipo: equipoPrimitive.id,
            name_farmacia: equipoPrimitive.name_farmacia,
            id_farmacia: equipoPrimitive.id_farmacia,
            resum_equipo: `
                Punto ${equipoPrimitive.banco} serial ${equipoPrimitive.serial_code}
            `.trim(),
            observacion_asignacion: `
            Caja numero #${cajaPrimtive.nm_caja} asignada al area de ${cajaPrimtive.area}
            `.trim(),
        });
    }

    getAsigne = () => this.asigne;
}