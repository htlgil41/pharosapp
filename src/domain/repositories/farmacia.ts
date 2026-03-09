import type { FarmaciaEntity } from "../entities/farmacia.ts";

export interface FarmaciaRepository {
    createFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
    getFarmaciaById(id_farmacia: number): Promise<FarmaciaEntity | null>;
    getFarmacia(search: string): Promise<FarmaciaEntity[]>;

    updateFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
    deleteFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity>;
}