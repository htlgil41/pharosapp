import { FarmaciaEntity } from "../../domain/entities/farmacia.ts";
import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataAlredyExistsExceptionUseCase } from "../exceptions/dataAlredyExists.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface NewFarmaciaDTO {
    some_code: string;
    name_farmacia: string;
    rif: string;
    direccion: string | null;
}

export interface FarmciaResponseDTO {
    id: number;
    some_code: string;
    name_farmacia: string;
    rif: string;
    direccion: string | null;
}

export class NewFarmaciaUseCase {
    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        dto: NewFarmaciaDTO
    ): Promise<FarmciaResponseDTO>{
        if (!ServiceAuthorization.accessOnly('coordinador', dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
            
        const farmacia = await this.repo.getFarmaciaByExact(dto.rif);
        if (farmacia) throw new DataAlredyExistsExceptionUseCase(
            'La farmacia ya se encuentra registrada',
            'Se encontro una farmacia con informacion muy similar verifica que ya esta no este registrada',
            ''
        );

        const createdFarmacia = await this.repo.createFarmacia(FarmaciaEntity.build({
            id: 1,
            direccion: dto.direccion,
            name_farmcia: dto.name_farmacia,
            rif: dto.rif,
            some_code: dto.some_code,
        }));
        const farmaciaPrimitive = createdFarmacia.toValue();
        return {
            id: farmaciaPrimitive.id,
            some_code: farmaciaPrimitive.some_code,
            direccion: farmaciaPrimitive.direccion,
            name_farmacia: farmaciaPrimitive.name_farmcia,
            rif: farmaciaPrimitive.rif,
        };
    }
}