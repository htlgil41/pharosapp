import type { RegisterEquipoImpresoraFarmaciaAggregate } from "../aggregates/registerEquipoImpresora.ts";
import type { RegisterEquipoPcFarmaciaAggregate } from "../aggregates/registerEquipoPc.ts";
import type { RegisterPuntoVentaFarmaciaAggregate } from "../aggregates/registerEquipoPuntoVenta.ts";
import type { ImpresoraEntity } from "../entities/impresora.ts";
import type { PcEntity } from "../entities/pc.ts";
import type { PuntoVentaEntity } from "../entities/puntoVenta.ts";
import type { EquipoPC } from "../interfaces/equipos.ts";

export interface EquiposRepository {
    createEquipoPC(aggregate: RegisterEquipoPcFarmaciaAggregate): Promise<PcEntity>;
    createEquipoImpresora(aggregate: RegisterEquipoImpresoraFarmaciaAggregate): Promise<ImpresoraEntity>;
    createPuntoVenta(aggregate: RegisterPuntoVentaFarmaciaAggregate): Promise<PuntoVentaEntity>;

    getEqipoPcByFarmaciaPage(
        page: number,
        id_farmacia: number,
    ): Promise<PcEntity[]>;
    getEqipoImpresoraByFarmaciaPage(
        page: number,
        id_farmacia: number,
    ): Promise<ImpresoraEntity[]>;
    getPuntosByFarmaciaPage(
        page: number,
        id_farmacia: number,
    ): Promise<PuntoVentaEntity[]>;

    deleteEquipoPc(): Promise<EquipoPC>;
    deleteEquipoImpresora(): Promise<ImpresoraEntity>;
    deletePuntoVenta(): Promise<PuntoVentaEntity>;
}