import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

export class NewAsigneCajaUseCase {
    constructor(
        private repoFarmacia: FarmaciaRepository,
        private repoEquipo: EquiposRepository
    ){}

    async erxecute(
        dataUsuario: DataAccessToken
    ): Promise<void> {
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();

        const caja = await this.repoFarmacia.getCajaByNm(1, 34);
        if (!caja) throw new DataNotFoundExceptionUseCase(
            'No se ha encontrado la caja para poder asigarle el equipo',
            'Debe ser una caja habilitada en tienda para poder asignarle este equipo',
            ''
        );

        // TODO:
    }
}