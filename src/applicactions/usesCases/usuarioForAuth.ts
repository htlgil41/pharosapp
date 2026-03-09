import type { AuthLoginDTO } from "../dtosInterfaces/param/authLogin.ts";
import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import { InvalidPasswordExceptionUseCase } from "../exceptions/invalidPassword.ts";
import { UserNotFoundExceptionUseCase } from "../exceptions/userNotFound.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class UsuarioForAuthUseCase extends UsuarioRepoUsesCases {

    async execute(params: AuthLoginDTO): Promise<AuthLoginResponse>{
        const validateExisteUsuario = await this.repo.getUsuarioByUsername(
            params.username
        );
        if (validateExisteUsuario === null) throw new UserNotFoundExceptionUseCase();

        void validateExisteUsuario.validateUsuarioWithRole();
        const {
            id: idUsuario,
            usuario: usuarioInfo
        } = validateExisteUsuario.toValue();

        const farmciaauth = validateExisteUsuario.asigneFarmacia(params.farmacia_auth.id_farmacia);
        const validatePassHash = this.serviceHashData.validateHash(
            usuarioInfo.password,
            params.password
        );
        if (!validatePassHash) new InvalidPasswordExceptionUseCase()
        const [ token_access, token_refresh ] = await Promise.all([
            this.serviceJoseToken.firmTokenAccess(
                {
                    id: idUsuario,
                    id_role: usuarioInfo.id_role!,
                    role: usuarioInfo.role!,
                    id_farmacia: farmciaauth.id_farmacia!,
                    farmacia: farmciaauth.name_farmacia,
                    username: usuarioInfo.username,
                },
                8
            ),
            this.serviceJoseToken.firmTokenRefresh(
                {   
                    id: idUsuario,
                    username: usuarioInfo.username,
                    farmacia: {
                        id_farmacia: farmciaauth.id_farmacia,
                        farmacia: farmciaauth.name_farmacia,
                    },
                    date: new Date()
                },
                43800
            )
        ]);
        
        return {
            token_access,
            token_refresh,
        };
    }
}