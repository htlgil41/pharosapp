import { CajaAsignePuntoEntity } from "../entities/cajaAsignePunto.ts";
import type { PuntoVentaEntity } from "../entities/puntoVenta.ts";

export class CreateAsignePuntoFarmaciaAggregate {

    private asigne: CajaAsignePuntoEntity;

    constructor(
        private punto: PuntoVentaEntity,
    ){
        const puntoPrimitive = punto.toValue();
    
        this.asigne = CajaAsignePuntoEntity.build({
           id: 1,
           id_farmacia: puntoPrimitive.id_farmacia,
           name_farmacia: puntoPrimitive.name_farmacia,
           id_punto_venta: puntoPrimitive.id,
           observacion_pos: '',
        });
    }

    getAsigne = () => this.asigne;
}