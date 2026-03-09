import type { AuthLoginDTO } from "../dtosInterfaces/param/authLogin.ts";
import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
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
            farmacias_asigne,
            usuario: usuarioInfo
        } = validateExisteUsuario.toValue();
        const farmciaauth = farmacias_asigne.find(f => f.id_farmacia === params.farmacia_auth.id_farmacia);
        if (!farmciaauth) throw new Error()
      
        const validatePassHash = this.serviceHashData.validateHash(
            usuarioInfo.password,
            params.password
        );
        if (!validatePassHash) new Error()
        const [
            token_access,
            token_refresh
        ] = await Promise.all([
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