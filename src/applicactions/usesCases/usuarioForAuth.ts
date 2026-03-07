import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class UsuarioForAuthUseCase extends UsuarioRepoUsesCases {

    async execute(
        username: string,
        password: string
    ): Promise<AuthLoginResponse>{
        const validateExisteUsuario = await this.repo.getUsuarioByUsername(
            username
        );
        if (!validateExisteUsuario) throw new Error('No existe el usuario');

        const valuesUsuarioPrimitive = validateExisteUsuario.toValue();
        const validatePassHash = this.serviceHashData.validateHash(
            valuesUsuarioPrimitive.usuario.password,
            password
        );

        if (!validatePassHash) throw new Error('Username o Password incorrectos');
        const [
            token_access,
            token_refresh
        ] = await Promise.all([
            this.serviceJoseToken.firmTokenAccess(
                {
                    id: 1,
                    id_role: 1,
                    role: '',
                    id_farmacia: 1,
                    farmacia: '',
                    username: '',
                },
                8
            ),
            this.serviceJoseToken.firmTokenRefresh(
                {
                    id: 1,
                    username: '',
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