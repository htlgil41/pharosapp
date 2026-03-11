import type { PrismaClient } from "../models/client/client.ts";
import { PcEntity } from "../../../../../../domain/entities/pc.ts";
import type { EquiposRepository } from "../../../../../../domain/repositories/equipos.ts";
import { ErrorPrismaExceptions } from "../exceptions/errosManager.ts";
import { ImpresoraEntity } from "../../../../../../domain/entities/impresora.ts";
import { PuntoVentaEntity } from "../../../../../../domain/entities/puntoVenta.ts";
import type { RegisterEquipoPcFarmaciaAggregate } from "../../../../../../domain/aggregates/registerEquipoPc.ts";
import type { RegisterEquipoImpresoraFarmaciaAggregate } from "../../../../../../domain/aggregates/registerEquipoImpresora.ts";
import type { RegisterPuntoVentaFarmaciaAggregate } from "../../../../../../domain/aggregates/registerEquipoPuntoVenta.ts";
import type { DeleteEquipoPcAggregate } from "../../../../../../domain/aggregates/deleteEquipoPc.ts";
import type { DeleteEquipoImpresoraAggregate } from "../../../../../../domain/aggregates/deleteEquipoImpresora.ts";
import type { DeleteEquipoPuntoVentaAggregate } from "../../../../../../domain/aggregates/deleteEquipoPuntoVenta.ts";

export class EquipoRepositoryPrismaPg implements EquiposRepository {

    constructor(
        private conn: PrismaClient
    ){}
    
    async createEquipoPC(aggregate: RegisterEquipoPcFarmaciaAggregate): Promise<PcEntity> {
        const equipo = aggregate.getEquipo();
        const inventarioPrimitive = aggregate.getInventario().toValue();

        const equipoPrimitive = equipo.toValue();
        try {
            const [ createdPc, _ ] = await this.conn.$transaction([
                this.conn.equipo_pc.create({
                    data: {
                        name_farmacia: equipoPrimitive.name_farmacia,
                        id_farmacia: equipoPrimitive.id_farmacia,
                        ip: equipoPrimitive.ip,
                        anydesk: equipoPrimitive.anydesk,
                        sa_anydesk: equipoPrimitive.sa_anydesk,
                        so: equipoPrimitive.so,
                        ram: equipoPrimitive.ram,
                        disk: equipoPrimitive.disk,
                        rom_size: equipoPrimitive.rom_size,
                    },
                    select: {
                        id: true,
                    },    
                }),
                this.conn.inventario_general.create({
                    data: {
                        name_farmacia: inventarioPrimitive.name_farmacia,
                        id_farmacia: inventarioPrimitive.id_farmacia,
                        hardware: inventarioPrimitive.hardware,
                        nota: inventarioPrimitive.nota,
                        cantidad: inventarioPrimitive.cantidad,
                    },
                    select: {},
                }),
            ]);

            equipo.setId(createdPc.id);
            return equipo;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async createEquipoImpresora(aggregate: RegisterEquipoImpresoraFarmaciaAggregate): Promise<ImpresoraEntity> {
        const equipo = aggregate.getEquipo();
        const inventarioPrimitive = aggregate.getInventario().toValue();

        const equipoPrimitive = equipo.toValue();
        try {
            const [ impresoraCreated, _ ] = await this.conn.$transaction([
                this.conn.equipo_impresora.create({
                    data: {
                        name_farmacia: equipoPrimitive.name_farmacia,
                        id_farmacia: equipoPrimitive.id,
                        modelo_print: equipoPrimitive.modelo_print,
                        marca: equipoPrimitive.marca,
                        area: equipoPrimitive.area,
                        count_toners: equipoPrimitive.count_toners,
                    },
                    select: {
                        id: true,
                    },
                }),
                this.conn.inventario_general.create({
                    data: {
                        name_farmacia: inventarioPrimitive.name_farmacia,
                        id_farmacia: inventarioPrimitive.id_farmacia,
                        hardware: inventarioPrimitive.hardware,
                        nota: inventarioPrimitive.nota,
                        cantidad: inventarioPrimitive.cantidad,
                    },
                    select: {},
                }),
            ]);
            equipo.setId(impresoraCreated.id);
            return equipo;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async createPuntoVenta(aggregate: RegisterPuntoVentaFarmaciaAggregate): Promise<PuntoVentaEntity> {
        const equipo = aggregate.getEquipo();
        const inventarioPrimitive = aggregate.getInventario().toValue();

        const equipoPrimitive = equipo.toValue();
        try {
            const [ impresoraCreated, _ ] = await this.conn.$transaction([
                this.conn.punto_venta.create({
                    data: {
                        name_farmacia: equipoPrimitive.name_farmacia,
                        id_farmacia: equipoPrimitive.id,
                        modelo: equipoPrimitive.modelo,
                        serial_code: equipoPrimitive.serial_code,
                        banco: equipoPrimitive.banco,
                        tag: equipoPrimitive.tag,
                    },
                    select: {
                        id: true,
                    },
                }),
                this.conn.inventario_general.create({
                    data: {
                        name_farmacia: inventarioPrimitive.name_farmacia,
                        id_farmacia: inventarioPrimitive.id_farmacia,
                        hardware: inventarioPrimitive.hardware,
                        nota: inventarioPrimitive.nota,
                        cantidad: inventarioPrimitive.cantidad,
                    },
                    select: {},
                }),
            ]);
            equipo.setId(impresoraCreated.id);
            return equipo;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getEqipoPcByFarmaciaPage(page: number, id_farmacia: number): Promise<PcEntity[]> {
        try {
            const pcs = await this.conn.equipo_pc.findMany({
                where: {
                    id_farmacia,
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    id_farmacia: true,
                    ip: true,
                    anydesk: true,
                    sa_anydesk: true,
                    so: true,
                    ram: true,
                    disk: true,
                    rom_size: true,
                },
                skip: page <= 1 ? 0 : page * 20 - 20 + 1,
                take: 20
            });
            if (pcs.length == 0) return [];
            return pcs.map(pc => PcEntity.build({
                id: pc.id,
                name_farmacia: pc.name_farmacia,
                id_farmacia: pc.id_farmacia,
                ip: pc.ip,
                anydesk: pc.anydesk,
                sa_anydesk: pc.sa_anydesk,
                disk: pc.disk,
                ram: pc.ram,
                rom_size: pc.rom_size,
                so: pc.so,
            }));
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getEquipoPcById(
        id_farmacia: number,
        id_equipo: number
    ): Promise<PcEntity | null> {
        try {
            const pc = await this.conn.equipo_pc.findUnique({
                where: {
                    id_farmacia,
                    id: id_equipo,
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    id_farmacia: true,
                    ip: true,
                    anydesk: true,
                    sa_anydesk: true,
                    so: true,
                    ram: true,
                    disk: true,
                    rom_size: true,
                },
            });
            if (pc === null) return null;
            return PcEntity.build({
                id: pc.id,
                name_farmacia: pc.name_farmacia,
                id_farmacia: pc.id_farmacia,
                ip: pc.ip,
                anydesk: pc.anydesk,
                sa_anydesk: pc.sa_anydesk,
                disk: pc.disk,
                ram: pc.ram,
                rom_size: pc.rom_size,
                so: pc.so,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getEqipoImpresoraByFarmaciaPage(page: number, id_farmacia: number): Promise<ImpresoraEntity[]> {
        try {
            const impresoras = await this.conn.equipo_impresora.findMany({
                where: {
                    id_farmacia,
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    id_farmacia: true,
                    modelo_print: true,
                    marca: true,
                    area: true,
                    count_toners: true,
                },
                skip: page <= 1 ? 0 : page * 20 - 20 + 1,
                take: 20
            });
            if (impresoras.length == 0) return [];
            return impresoras.map(imp => ImpresoraEntity.build({
                id: imp.id,
                id_farmacia: imp.id_farmacia,
                name_farmacia: imp.name_farmacia,
                modelo_print: imp.modelo_print,
                marca: imp.marca,
                area: imp.area,
                count_toners: imp.count_toners,
            }));
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getEquipoImpresoraById(
        id_farmacia: number,
        id_equipo: number
    ): Promise<ImpresoraEntity | null> {
        try {
            const impresora = await this.conn.equipo_impresora.findUnique({
                where: {
                    id_farmacia,
                    id: id_equipo,
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    id_farmacia: true,
                    area: true,
                    marca: true,
                    count_toners: true,
                    modelo_print: true,
                },
            });
            if (impresora === null) return null;
            return ImpresoraEntity.build({
                id: impresora.id,
                name_farmacia: impresora.name_farmacia,
                id_farmacia: impresora.id_farmacia,
                area: impresora.area,
                marca: impresora.marca,
                count_toners: impresora.count_toners,
                modelo_print: impresora.modelo_print,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getPuntosByFarmaciaPage(page: number, id_farmacia: number): Promise<PuntoVentaEntity[]> {
        try {
            const impresoras = await this.conn.punto_venta.findMany({
                where: {
                    id_farmacia,
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    id_farmacia: true,
                    modelo: true,
                    banco: true,
                    serial_code: true,
                    tag: true,
                },
                skip: page <= 1 ? 0 : page * 20 - 20 + 1,
                take: 20
            });
            if (impresoras.length == 0) return [];
            return impresoras.map(p => PuntoVentaEntity.build({
                id: p.id,
                id_farmacia: p.id_farmacia,
                name_farmacia: p.name_farmacia,
                banco: p.banco,
                modelo: p.modelo,
                serial_code: p.serial_code,
                tag: p.tag,
            }));
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getEquipoPuntoVentaById(
        id_farmacia: number,
        id_equipo: number
    ): Promise<PuntoVentaEntity | null> {
        try {
            const punto = await this.conn.punto_venta.findUnique({
                where: {
                    id_farmacia,
                    id: id_equipo,
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    id_farmacia: true,
                    banco: true,
                    modelo: true,
                    serial_code: true,
                    tag: true, 
                },
            });
            if (punto === null) return null;
            return PuntoVentaEntity.build({
                id: punto.id,
                name_farmacia: punto.name_farmacia,
                id_farmacia: punto.id_farmacia,
                banco: punto.banco,
                modelo: punto.modelo,
                serial_code: punto.serial_code,
                tag: punto.tag,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getPuntoFarmaciaBySerial(id_farmacia: number, serial: string): Promise<PuntoVentaEntity | null> {
        try {
            const punto = await this.conn.punto_venta.findFirst({
                where: {
                    id_farmacia: id_farmacia,
                    serial_code: serial,
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    id_farmacia: true,
                    banco: true,
                    modelo: true,
                    serial_code: true,
                    tag: true, 
                },
            });
            if (punto === null) return null;
            return PuntoVentaEntity.build({
                id: punto.id,
                name_farmacia: punto.name_farmacia,
                id_farmacia: punto.id_farmacia,
                banco: punto.banco,
                modelo: punto.modelo,
                serial_code: punto.serial_code,
                tag: punto.tag,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async deleteEquipoPc(aggregate: DeleteEquipoPcAggregate): Promise<PcEntity> {
        const equipo = aggregate.getEquipo();
        const inventario = aggregate.getInventario().toValue();

        const equipoPrimitive = equipo.toValue();
        try {
            const [ equipoDeleted, _ ] = await this.conn.$transaction([
                this.conn.equipo_pc.delete({
                    where: {
                        id: equipoPrimitive.id,
                    },
                    select: {
                        id: true,
                    }
                }),
                this.conn.inventario_general.create({
                    data: {
                        name_farmacia: inventario.name_farmacia,
                        id_farmacia: inventario.id_farmacia,
                        hardware: inventario.hardware,
                        nota: inventario.nota,
                        cantidad: inventario.cantidad,
                    },
                    select: {}
                })
            ]);

            equipo.setId(equipoDeleted.id);
            return equipo;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async deleteEquipoImpresora(aggregate: DeleteEquipoImpresoraAggregate): Promise<ImpresoraEntity> {
        const equipo = aggregate.getEquipo();
        const inventario = aggregate.getInventario().toValue();

        const equipoPrimitive = equipo.toValue();
        try {
            
            const [ equipoDeleted, _ ] = await this.conn.$transaction([
                this.conn.equipo_impresora.delete({
                    where: {
                        id: equipoPrimitive.id,
                    },
                    select: {
                        id: true,
                    }
                }),
                this.conn.inventario_general.create({
                    data: {
                        name_farmacia: inventario.name_farmacia,
                        id_farmacia: inventario.id_farmacia,
                        hardware: inventario.hardware,
                        nota: inventario.nota,
                        cantidad: inventario.cantidad,
                    },
                    select: {}
                })
            ]);

            equipo.setId(equipoDeleted.id);
            return equipo;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async deletePuntoVenta(aggregate: DeleteEquipoPuntoVentaAggregate): Promise<PuntoVentaEntity> {
        const equipo = aggregate.getEquipo();
        const inventario = aggregate.getInventario().toValue();

        const equipoPrimitive = equipo.toValue();
        try {
            
            const [ equipoDeleted, _ ] = await this.conn.$transaction([
                this.conn.punto_venta.delete({
                    where: {
                        id: equipoPrimitive.id,
                    },
                    select: {
                        id: true,
                    }
                }),
                this.conn.inventario_general.create({
                    data: {
                        name_farmacia: inventario.name_farmacia,
                        id_farmacia: inventario.id_farmacia,
                        hardware: inventario.hardware,
                        nota: inventario.nota,
                        cantidad: inventario.cantidad,
                    },
                    select: {}
                })
            ]);

            equipo.setId(equipoDeleted.id);
            return equipo;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
}