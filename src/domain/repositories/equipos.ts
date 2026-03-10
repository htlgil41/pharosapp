import type { FarmaciaEntity } from "../entities/farmacia.ts";
import type { ImpresoraEntity } from "../entities/impresora.ts";
import type { PcEntity } from "../entities/pc.ts";
import type { PuntoVentaEntity } from "../entities/puntoVenta.ts";

export interface EquiposRepository {
    createEquipoPC(
        farmacia: FarmaciaEntity,
        pc: PcEntity
    ): Promise<PcEntity>;
    createEquipoImpresora(
        farmacia: FarmaciaEntity,
        impresora: ImpresoraEntity,
    ): Promise<ImpresoraEntity>;
    createPuntoVenta(
        farmacia: FarmaciaEntity,
        punto: PuntoVentaEntity,
    ): Promise<PuntoVentaEntity>;

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
}