import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class SwitchMpUseCase extends UsuarioRepoUsesCases {

    async execute(
        DataUsuario: DataAccessToken,
        id_farmacia: number,
    ): Promise<AuthLoginResponse> {
        const farmciasAsigneEntity = await this.repo.getFarmciaAsgineByUsuario(
            DataUsuario.id,
            id_farmacia
        );

        if (farmciasAsigneEntity === null) throw new FarmaciaNotAsigneUsuarioExceptionDomain(1);
        const farmaciaAsigne = farmciasAsigneEntity.toValue();
        return {
            token_access: '',
            token_refresh: ''
        };
    }
}