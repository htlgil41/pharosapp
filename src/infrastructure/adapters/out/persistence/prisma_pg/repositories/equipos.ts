import type { PrismaClient } from "../models/client/client.ts";
import type { FarmaciaEntity } from "../../../../../../domain/entities/farmacia.ts";
import { PcEntity } from "../../../../../../domain/entities/pc.ts";
import type { EquiposRepository } from "../../../../../../domain/repositories/equipos.ts";
import { ErrorPrismaExceptions } from "../exceptions/errosManager.ts";
import { ImpresoraEntity } from "../../../../../../domain/entities/impresora.ts";
import { PuntoVentaEntity } from "../../../../../../domain/entities/puntoVenta.ts";

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

    async createEquipoImpresora(farmacia: FarmaciaEntity, impresora: ImpresoraEntity): Promise<ImpresoraEntity> {
        const farmaciaPrimitive = farmacia.toValue();
        const impresoraPrimitive = impresora.toValue();
        try {
            const impresoraCreated = await this.conn.equipo_impresora.create({
                data: {
                    name_farmacia: farmaciaPrimitive.name_farmcia,
                    id_farmacia: farmaciaPrimitive.id,
                    modelo_print: impresoraPrimitive.modelo_print,
                    marca: impresoraPrimitive.marca,
                    area: impresoraPrimitive.area,
                    count_toners: impresoraPrimitive.count_toners,
                },
                select: {
                    id: true,
                },
            });
            impresora.setId(impresoraCreated.id);
            return impresora;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async createPuntoVenta(farmacia: FarmaciaEntity, punto: PuntoVentaEntity): Promise<PuntoVentaEntity> {
        const farmaciaPrimitive = farmacia.toValue();
        const puntoPrimitive = punto.toValue();
        try {
            const createPunto = await this.conn.punto_venta.create({
                data: {
                    name_farmacia: farmaciaPrimitive.name_farmcia,
                    id_farmacia: farmaciaPrimitive.id,
                    modelo: puntoPrimitive.modelo,
                    banco: puntoPrimitive.banco,
                    serial_code: puntoPrimitive.serial_code,
                    tag: puntoPrimitive.tag,
                },
                select: {
                    id: true,
                },
            });
            punto.setId(createPunto.id);
            return punto;
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
}