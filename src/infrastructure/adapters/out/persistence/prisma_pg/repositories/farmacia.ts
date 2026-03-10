import { CajaFarmaciaEntity } from "../../../../../../domain/entities/cajaFarmacia.ts";
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

    async creteCajaFarmacia(
        farmacia: FarmaciaEntity,
        caja: CajaFarmaciaEntity
    ): Promise<CajaFarmaciaEntity> {
        const farmaciaPrimitive = farmacia.toValue();
        const cajaPrimitive = caja.toValue();
        try {
            await this.conn.caja_farmacia.create({
                data: {
                    id: farmaciaPrimitive.id,
                    id_farmacia: farmaciaPrimitive.id,
                    name_farmacia: farmaciaPrimitive.name_farmcia,
                    nm_caja: cajaPrimitive.nm_caja,
                    area: cajaPrimitive.area,
                },
                select: {}
            });
            return caja;
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
    
    async getFarmaciaBy(search: string): Promise<FarmaciaEntity[]> {
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

    async getFarmaciaByExact(search: string): Promise<FarmaciaEntity | null> {
        try {
            const farmacia = await this.conn.farmacias.findFirst({
                where: {
                    OR: [
                        {
                            some_code: {
                                equals: search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            rif: {
                                equals: search,
                                mode: 'insensitive'
                            }
                        },
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

    async getCajaById(id_caja: number): Promise<CajaFarmaciaEntity | null> {
        try {
            const caja = await this.conn.caja_farmacia.findUnique({
                where: {
                    id: id_caja,
                },
                select: {
                    id: true,
                    id_farmacia: true,
                    name_farmacia: true,
                    nm_caja: true,
                    area: true,
                }
            });
            if (caja === null) return null;
            return CajaFarmaciaEntity.build({
                id: caja.id,
                area: caja.area, 
                name_farmacia: caja.name_farmacia,
                id_farmacia: caja.id_farmacia,
                nm_caja: caja.nm_caja,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getCajaByNm(
        id_farmacia: number,
        nmCaja: number
    ): Promise<CajaFarmaciaEntity | null> {
        try {
            const caja = await this.conn.caja_farmacia.findFirst({
                where: {
                    id_farmacia: id_farmacia,
                    nm_caja: nmCaja,
                },
                select: {
                    id: true,
                    id_farmacia: true,
                    name_farmacia: true,
                    nm_caja: true,
                    area: true,
                }
            });
            if (caja === null) return null;
            return CajaFarmaciaEntity.build({
                id: caja.id,
                area: caja.area, 
                name_farmacia: caja.name_farmacia,
                id_farmacia: caja.id_farmacia,
                nm_caja: caja.nm_caja,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getCajaByFarmacia(farmacia: FarmaciaEntity): Promise<CajaFarmaciaEntity[]> {
        const { id: id_farmacia } = farmacia.toValue();
        try {
            const cajas = await this.conn.caja_farmacia.findMany({
                where: {
                    id_farmacia
                },
            });
            if (cajas.length === 0) return [];
            return cajas.map(c => CajaFarmaciaEntity.build({
                id: c.id,
                area: c.area, 
                name_farmacia: c.name_farmacia,
                id_farmacia: c.id_farmacia,
                nm_caja: c.nm_caja,
            }));
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getCajaByArea(
        id_farmacia: number, 
        area: string
    ): Promise<CajaFarmaciaEntity[]> {
        try {
            const cajas = await this.conn.caja_farmacia.findMany({
                where: {
                    id_farmacia,
                    area: {
                        contains: area,
                        mode: 'insensitive',
                    },
                },
            });
            if (cajas.length === 0) return [];
            return cajas.map(c => CajaFarmaciaEntity.build({
                id: c.id,
                area: c.area, 
                name_farmacia: c.name_farmacia,
                id_farmacia: c.id_farmacia,
                nm_caja: c.nm_caja,
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