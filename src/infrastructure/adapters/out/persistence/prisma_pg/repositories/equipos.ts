import type { PrismaClient } from "../models/client/client.ts";
import type { FarmaciaEntity } from "../../../../../../domain/entities/farmacia.ts";
import type { PcEntity } from "../../../../../../domain/entities/pc.ts";
import type { EquiposRepository } from "../../../../../../domain/repositories/equipos.ts";
import { ErrorPrismaExceptions } from "../exceptions/errosManager.ts";

export class EquipoRepositoryPrismaPg implements EquiposRepository {

    constructor(
            private conn: PrismaClient
        ){}
    

    async createEquipoPC(farmacia: FarmaciaEntity, pc: PcEntity): Promise<PcEntity> {
        const farmaciaPrimitive = farmacia.toValue();
        const pcPrimitive = pc.toValue();
        try {
            const createdPc = await this.conn.equipo_pc.create({
                data: {
                    name_farmacia: farmaciaPrimitive.name_farmcia,
                    id_farmacia: farmaciaPrimitive.id,
                    ip: pcPrimitive.ip,
                    anydesk: pcPrimitive.anydesk,
                    sa_anydesk: pcPrimitive.sa_anydesk,
                    so: pcPrimitive.so,
                    ram: pcPrimitive.ram,
                    disk: pcPrimitive.disk,
                    rom_size: pcPrimitive.rom_size,
                },
                select: {
                    id: true,
                },    
            });
            pc.setId(createdPc.id);
            return pc;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
}