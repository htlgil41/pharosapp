import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import { TokenErrorExceptionUseCase } from "../exceptions/tokenError.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class RefreshTokenUseCase extends UsuarioRepoUsesCases {

    async execute(
        tokenRefresh: string,
        accessToken: string
    ): Promise<AuthLoginResponse> {
        let payloadAccessToken: DataAccessToken | undefined;
        try {
            payloadAccessToken = await this.serviceJoseToken.validateAccessToken(accessToken);
        } catch (error) {}

        const payloadRefreshToken = await this.serviceJoseToken.validateRefreshToken(tokenRefresh);
        if (!payloadAccessToken){

            const inforUserForCreateToken = await this.repo.getUsuarioByUsername(payloadRefreshToken.username);
            if (inforUserForCreateToken === null)
                throw new TokenErrorExceptionUseCase(
                    'No se ha encontrado la informacion para renovar su token',
                    'Esto es un problema inesperado ya que no se identifico la informacion del token',
                    ''
                )

            void inforUserForCreateToken.validateUsuarioWithRole();
            const {
                id: idUsuario,
                usuario: usuarioInfo
            } = inforUserForCreateToken.toValue();
            const [
                token_access,
                token_refresh
            ] = await Promise.all([
                this.serviceJoseToken.firmTokenAccess(
                    {
                        id: idUsuario,
                        id_role: usuarioInfo.id_role!,
                        role: usuarioInfo.role!,
                        id_farmacia: payloadRefreshToken.farmacia.id_farmacia,
                        farmacia: payloadRefreshToken.farmacia.farmacia,
                        username: usuarioInfo.username,
                    },
                    8
                ),
                this.serviceJoseToken.firmTokenRefresh(
                    {   
                        id: idUsuario,
                        username: usuarioInfo.username,
                        farmacia: {
                            id_farmacia: payloadRefreshToken.farmacia.id_farmacia,
                            farmacia: payloadRefreshToken.farmacia.farmacia,
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

        const [ token_access, token_refresh ] = await Promise.all([
            this.serviceJoseToken.firmTokenAccess(
                {
                    id: payloadAccessToken.id,
                    id_role: payloadAccessToken.id_role,
                    role: payloadAccessToken.role,
                    id_farmacia: payloadRefreshToken.farmacia.id_farmacia,
                    farmacia: payloadRefreshToken.farmacia.farmacia,
                    username: payloadAccessToken.username,
                },
                8
            ),
            this.serviceJoseToken.firmTokenRefresh(
                {   
                    id: payloadAccessToken.id,
                    username: payloadAccessToken.username,
                    farmacia: {
                        id_farmacia: payloadRefreshToken.farmacia.id_farmacia,
                        farmacia: payloadRefreshToken.farmacia.farmacia,
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