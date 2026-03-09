import type { FarmaciaEntity } from "../entities/farmacia.ts";

export interface FarmaciaRepository {
    createFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
    getFarmaciaById(id_farmacia: number): Promise<FarmaciaEntity | null>;
    getFarmaciaBy(search: string): Promise<FarmaciaEntity[]>;
    getFarmaciaByExact(search: string): Promise<FarmaciaEntity | null>;

    updateFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
    deleteFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
}