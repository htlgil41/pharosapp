import { FarmaciaEntity } from "../../../../../../domain/entities/farmacia.ts";
import type { FarmaciaRepository } from "../../../../../../domain/repositories/farmacia.ts";
import { ErrorPrismaExceptions } from "../exceptions/errosManager.ts";
import type { PrismaClient } from "../models/client/client.ts";

export class FarmaciaRepositoryPrismaPg implements FarmaciaRepository {

    constructor(
        private conn: PrismaClient
    ){}

    async createFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity> {
        
        const farmaciaPrimitive = farmacia.toValue();
        try {
            
            const createFarmacia = await this.conn.farmacias.create({
                data: {
                    some_code: farmaciaPrimitive.some_code,
                    name_farmacia: farmaciaPrimitive.name_farmcia,
                    rif: farmaciaPrimitive.rif,
                    direccion: farmaciaPrimitive.direccion,
                },
                select: {
                    id: true,
                }
            });

            farmacia.setId(createFarmacia.id);
            return farmacia;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
    
    async getFarmaciaById(id_farmacia: number): Promise<FarmaciaEntity | null> {
        try {
            
            const farmacia = await this.conn.farmacias.findUnique({
                where: {
                    id: id_farmacia,
                },
                select: {
                    id: true,
                    some_code: true,
                    direccion: true,
                    name_farmacia: true,
                    rif: true,
                }
            });

            if (farmacia === null) return null;
            return FarmaciaEntity.build({
                id: farmacia.id,
                some_code: farmacia.some_code,
                direccion: farmacia.direccion,
                name_farmcia: farmacia.name_farmacia,
                rif: farmacia.rif,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
    
    async getFarmacia(search: string): Promise<FarmaciaEntity[]> {
        try {
            const farmacia = await this.conn.farmacias.findMany({
                where: {
                    OR: [
                        {
                            some_code: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            rif: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            name_farmacia: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        }
                    ],
                },
                select: {
                    id: true,
                    some_code: true,
                    direccion: true,
                    name_farmacia: true,
                    rif: true,
                }
            });

            if (farmacia.length === 0) return [];
            return farmacia.map(f => FarmaciaEntity.build({
                id: f.id,
                some_code: f.some_code,
                direccion: f.direccion,
                name_farmcia: f.name_farmacia,
                rif: f.rif,
            }));
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
    
    async updateFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity> {
        
        const farmaciaPrimitive = farmacia.toValue();
        try {
            
            await this.conn.farmacias.update({
                where: {
                    id: farmaciaPrimitive.id,
                },
                data: {
                    name_farmacia: farmaciaPrimitive.name_farmcia,
                    some_code: farmaciaPrimitive.some_code,
                    rif: farmaciaPrimitive.rif,
                    direccion: farmaciaPrimitive.direccion
                }
            });
            
            return farmacia;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async deleteFarmacia(farmacia: FarmaciaEntity): Promise<FarmaciaEntity> {
        const farmaciaPrimitive = farmacia.toValue();
        try {
            await this.conn.farmacias.delete({
                where: {
                    id: farmaciaPrimitive.id,
                },
            });
            return farmacia;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }    
}