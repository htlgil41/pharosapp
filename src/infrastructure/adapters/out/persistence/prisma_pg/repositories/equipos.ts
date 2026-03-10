import type { PrismaClient } from "../models/client/client.ts";
import type { FarmaciaEntity } from "../../../../../../domain/entities/farmacia.ts";
import type { PcEntity } from "../../../../../../domain/entities/pc.ts";
import type { EquiposRepository } from "../../../../../../domain/repositories/equipos.ts";
import { ErrorPrismaExceptions } from "../exceptions/errosManager.ts";
import type { ImpresoraEntity } from "../../../../../../domain/entities/impresora.ts";
import type { PuntoVentaEntity } from "../../../../../../domain/entities/puntoVenta.ts";

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
}