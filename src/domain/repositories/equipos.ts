import type { FarmaciaEntity } from "../entities/farmacia.ts";
import type { PcEntity } from "../entities/pc.ts";

export interface EquiposRepository {
    createEquipoPC(
        farmacia: FarmaciaEntity,
        pc: PcEntity
    ): Promise<PcEntity>;
}