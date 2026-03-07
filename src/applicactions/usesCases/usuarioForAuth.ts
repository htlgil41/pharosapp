import type { AuthLoginDTO } from "../dtosInterfaces/param/authLogin.ts";
import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class UsuarioForAuthUseCase extends UsuarioRepoUsesCases {

    async execute(params: AuthLoginDTO): Promise<AuthLoginResponse>{
        const validateExisteUsuario = await this.repo.getUsuarioByUsername(
            params.username
        );
        if (!validateExisteUsuario) throw new Error('No existe el usuario');

        const {
            id: idUsuario,
            farmacias_asigne,
            usuario: usuarioInfo
        } = validateExisteUsuario.toValue();

        const farmciaauth = farmacias_asigne.find(f => f.id_farmacia === params.farmacia_auth.id_farmacia);
        if (!farmciaauth)
            throw new Error('Farmacia no asignada');
      
            const validatePassHash = this.serviceHashData.validateHash(
            usuarioInfo.password,
            params.password
        );

        if (!validatePassHash) throw new Error('Username o Password incorrectos');
        const [
            token_access,
            token_refresh
        ] = await Promise.all([
            this.serviceJoseToken.firmTokenAccess(
                {
                    id: idUsuario,
                    id_role: usuarioInfo.id_role,
                    role: usuarioInfo.role,
                    id_farmacia: farmciaauth.id_farmacia,
                    farmacia: farmciaauth.name_farmacia,
                    username: usuarioInfo.username,
                },
                8
            ),
            this.serviceJoseToken.firmTokenRefresh(
                {   
                    id: idUsuario,
                    username: usuarioInfo.username,
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