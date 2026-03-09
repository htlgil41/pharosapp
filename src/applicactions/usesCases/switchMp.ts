import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class SwitchMpUseCase extends UsuarioRepoUsesCases {

    async execute(
        id_farmacia: number,
        at: string
    ): Promise<AuthLoginResponse> {
        const dataToken = await this.serviceJoseToken.validateAccessToken(at);
        const farmciasAsigneEntity = await this.repo.getFarmciaAsgineByUsuario(
            dataToken.id,
            id_farmacia
        );

        if (farmciasAsigneEntity === null) throw new FarmaciaNotAsigneUsuarioExceptionDomain(1);
        const farmaciaAsigne = farmciasAsigneEntity.toValue();
        const [ token_access, token_refresh ] = await Promise.all([
            this.serviceJoseToken.firmTokenAccess(
                dataToken,
                8
            ),
            this.serviceJoseToken.firmTokenRefresh(
                {   
                    id: dataToken.id,
                    username: dataToken.username,
                    farmacia: {
                        id_farmacia: farmaciaAsigne.id,
                        farmacia: farmaciaAsigne.name_farmcia,
                    },
                    date: new Date()
                },
                43800
            )
        ]);
        return {
            token_access,
            token_refresh
        };
    }
}