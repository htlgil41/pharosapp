import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import { TokenErrorExceptionUseCase } from "../exceptions/tokenError.ts";
import type { DataAccessToken, DataRefreshToken } from "../ports/token.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class RefreshTokenUseCase extends UsuarioRepoUsesCases {

    async execute(
        DataUsuario: DataAccessToken | null,
        DataSession: DataRefreshToken
    ): Promise<AuthLoginResponse> {
        if (DataUsuario === null){

            const inforUserForCreateToken = await this.repo.getUsuarioByUsername(DataSession.username);
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
 

             return {
                token_access: '',
                token_refresh: ''
            };
        }
        
        return {
            token_access: '',
            token_refresh: ''
        };
    }
}