import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface CajaFarmaciaDTO {
    idFarmacia: number;
    nmCaja: number;
}

export class DeleteCajaFarmaciaUseCase {
     constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        dto: CajaFarmaciaDTO
    ): Promise<CajaFarmaciaDTO>{
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();

        const caja = await this.repo.getCajaByNm(dto.idFarmacia, dto.nmCaja);
        if (caja === null) throw new DataNotFoundExceptionUseCase(
            'No se ha encontrado la caja asignada a la farmacia',
            'Puedes crear o asignar estos mismos datos para caja en la farmacia',
            ''
        );
        await this.repo.deleteCaja(caja);
        return dto;
    }
}