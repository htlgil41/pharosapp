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
            usuario: usuarioInfo
        } = validateExisteUsuario.toValue();
        
        const farmciaauth = validateExisteUsuario.asigneFarmacia(params.farmacia_auth.id_farmacia);
        return {
            token_access: '',
            token_refresh: '',
        };
    }
}