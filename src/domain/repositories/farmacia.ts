import type { CreateAsigneCajaFarmaciaAggregate } from "../aggregates/createAsigneCajaFarmacia.ts";
import type { CreateAsignePuntoFarmaciaAggregate } from "../aggregates/createAsignePuntoFarmacia.ts";
import type { CajaAsigneEquipoEntity } from "../entities/cajaAsigneEquipo.ts";
import type { CajaAsignePuntoEntity } from "../entities/cajaAsignePunto.ts";
import type { CajaFarmaciaEntity } from "../entities/cajaFarmacia.ts";
import type { FarmaciaEntity } from "../entities/farmacia.ts";

export interface FarmaciaRepository {
    createFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
    creteCajaFarmacia(
        farmacia: FarmaciaEntity,
        caja: CajaFarmaciaEntity
    ): Promise<CajaFarmaciaEntity>;
    createAsigneEquipoPc(aggregate: CreateAsigneCajaFarmaciaAggregate): Promise<CajaAsigneEquipoEntity>;
    createAsignePuntoVenta(aggreagte: CreateAsignePuntoFarmaciaAggregate): Promise<CajaAsignePuntoEntity>;

    getAllFarmacia(): Promise<FarmaciaEntity[]>;
    getFarmaciaById(id_farmacia: number): Promise<FarmaciaEntity | null>;
    getFarmaciaBy(search: string): Promise<FarmaciaEntity[]>;
    getFarmaciaByExact(search: string): Promise<FarmaciaEntity | null>;
    getCajaById(id_caja: number): Promise<CajaFarmaciaEntity | null>;
    getCajaByNm(
        id_farmacia: number,
        nmCaja: number
    ): Promise<CajaFarmaciaEntity | null>;
    getCajaByFarmacia(farmacia: FarmaciaEntity): Promise<CajaFarmaciaEntity[]>;
    getCajaByArea(
        id_farmacia: number,
        area: string
    ): Promise<CajaFarmaciaEntity[]>;
    
    updateFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
    deleteFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
    deleteCaja(caja: CajaFarmaciaEntity): Promise<CajaFarmaciaEntity>;
}