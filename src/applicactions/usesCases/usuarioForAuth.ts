import type { AuthLoginDTO } from "../dtosInterfaces/authLogin.ts";
import type { DataSessionDTO } from "../dtosInterfaces/datatoken.ts";
import { UserNotFoundExceptionUseCase } from "../exceptions/userNotFound.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class UsuarioForAuthUseCase extends UsuarioRepoUsesCases {

    async execute(params: AuthLoginDTO): Promise<DataSessionDTO>{
        const validateExisteUsuario = await this.repo.getUsuarioByUsername(
            params.username
        );
        if (validateExisteUsuario === null) throw new UserNotFoundExceptionUseCase();

        void validateExisteUsuario.validateUsuarioWithRole();
        const { id: idUsuario, usuario: usuarioInfo } = validateExisteUsuario.toValue();
        const farmaciauth = validateExisteUsuario.asigneFarmacia(params.farmacia_auth.id_farmacia);
        return {
            ac: {
                id: idUsuario,
                id_role: usuarioInfo.id_role!,
                role: usuarioInfo.role!,
                farmacia: farmaciauth.name_farmacia,
                id_farmacia: farmaciauth.id_farmacia,
                username: usuarioInfo.username
            },
            rt: {
                id: idUsuario,
                farmacia: {
                    id_farmacia: farmaciauth.id_farmacia,
                    farmacia: farmaciauth.name_farmacia,
                },
                username: usuarioInfo.username,
                date: new Date(),
            }
        }
    }
}