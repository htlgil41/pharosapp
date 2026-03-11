import { RegisterEquipoImpresoraFarmaciaAggregate } from "../../domain/aggregates/registerEquipoImpresora.ts";
import { FarmaciaEntity } from "../../domain/entities/farmacia.ts";
import { ImpresoraEntity } from "../../domain/entities/impresora.ts";
import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface PcDTO {
    area: string;
    marca: string;
    modelo_print: string;
    count_toners: number;
}

export class NewImpresoraUseCase {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execte(
        dataUsuario: DataAccessToken,
        dto: PcDTO
    ): Promise<PcDTO> {
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        
        const impresora = await this.repoEquipo.createEquipoImpresora(new RegisterEquipoImpresoraFarmaciaAggregate(
            FarmaciaEntity.build({
                id: dataUsuario.id_farmacia,
                name_farmcia: dataUsuario.farmacia ?? '',
                rif: 'J-000000000',
                direccion: '',
                some_code: '',
            }),
            ImpresoraEntity.build({
                id: 1,
                id_farmacia: dataUsuario.id_farmacia,
                name_farmacia: dataUsuario.farmacia ,
                area: dto.area,
                marca: dto.marca,
                modelo_print: dto.modelo_print,
                count_toners: dto.count_toners,
            }),
            1
        ));

        const impresoraPrimitive = impresora.toValue();
        return {
            area: impresoraPrimitive.area,
            marca: impresoraPrimitive.marca,
            modelo_print: impresoraPrimitive.modelo_print,
            count_toners: impresoraPrimitive.count_toners,
        };
    }
}