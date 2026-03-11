import { RegisterPuntoVentaFarmaciaAggregate } from "../../domain/aggregates/registerEquipoPuntoVenta.ts";
import { FarmaciaEntity } from "../../domain/entities/farmacia.ts";
import { PuntoVentaEntity } from "../../domain/entities/puntoVenta.ts";
import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface PcDTO {
    banco: string;
    modelo: string;
    serial_code: string;
    tag: string | null;
}

export class NewPuntoVentaUseCase {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execte(
        dataUsuario: DataAccessToken,
        dto: PcDTO
    ): Promise<PcDTO> {
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        
        const punto = await this.repoEquipo.createPuntoVenta(new RegisterPuntoVentaFarmaciaAggregate(
            FarmaciaEntity.build({
                id: dataUsuario.id_farmacia,
                name_farmcia: dataUsuario.farmacia ?? '',
                rif: 'J-000000000',
                direccion: '',
                some_code: '',
            }),
            PuntoVentaEntity.build({
                id: 1,
                id_farmacia: dataUsuario.id_farmacia,
                name_farmacia: dataUsuario.farmacia ,
                banco: dto.banco,
                modelo: dto.modelo,
                serial_code: dto.serial_code,
                tag: dto.tag,
            }),
            1
        ));

        const puntoPrimitive = punto.toValue();
        return {
            banco: puntoPrimitive.banco,
            modelo: puntoPrimitive.modelo,
            serial_code: puntoPrimitive.serial_code,
            tag: puntoPrimitive.tag,
        };
    }
}