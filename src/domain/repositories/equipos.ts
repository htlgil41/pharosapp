import type { DeleteEquipoImpresoraAggregate } from "../aggregates/deleteEquipoImpresora.ts";
import type { DeleteEquipoPcAggregate } from "../aggregates/deleteEquipoPc.ts";
import type { DeleteEquipoPuntoVentaAggregate } from "../aggregates/deleteEquipoPuntoVenta.ts";
import type { RegisterEquipoImpresoraFarmaciaAggregate } from "../aggregates/registerEquipoImpresora.ts";
import type { RegisterEquipoPcFarmaciaAggregate } from "../aggregates/registerEquipoPc.ts";
import type { RegisterPuntoVentaFarmaciaAggregate } from "../aggregates/registerEquipoPuntoVenta.ts";
import type { ImpresoraEntity } from "../entities/impresora.ts";
import type { PcEntity } from "../entities/pc.ts";
import type { PuntoVentaEntity } from "../entities/puntoVenta.ts";

export interface EquiposRepository {
    createEquipoPC(aggregate: RegisterEquipoPcFarmaciaAggregate): Promise<PcEntity>;
    createEquipoImpresora(aggregate: RegisterEquipoImpresoraFarmaciaAggregate): Promise<ImpresoraEntity>;
    createPuntoVenta(aggregate: RegisterPuntoVentaFarmaciaAggregate): Promise<PuntoVentaEntity>;

    getEqipoPcByFarmaciaPage(
        page: number,
        id_farmacia: number,
    ): Promise<PcEntity[]>;
    getEquipoPcById(id_equipo: number): Promise<PcEntity | null>;
    getEqipoImpresoraByFarmaciaPage(
        page: number,
        id_farmacia: number,
    ): Promise<ImpresoraEntity[]>;
    getEquipoImpresoraById(id_equipo: number): Promise<ImpresoraEntity | null>;
    getPuntosByFarmaciaPage(
        page: number,
        id_farmacia: number,
    ): Promise<PuntoVentaEntity[]>;
    getEquipoPuntoVentaById(id_equipo: number): Promise<PuntoVentaEntity | null>;
    getPuntoFarmaciaBySerial(
        id_farmacia: number,
        serial: string
    ): Promise<PuntoVentaEntity | null>;

    deleteEquipoPc(aggregate: DeleteEquipoPcAggregate): Promise<PcEntity>;
    deleteEquipoImpresora(aggregate: DeleteEquipoImpresoraAggregate): Promise<ImpresoraEntity>;
    deletePuntoVenta(aggregate: DeleteEquipoPuntoVentaAggregate): Promise<PuntoVentaEntity>;
}