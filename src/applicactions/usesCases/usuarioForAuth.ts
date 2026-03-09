import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import type { AuthLoginDTO } from "../dtosInterfaces/authLogin.ts";
import type { UsuarioInfoDTO } from "../dtosInterfaces/datatoken.ts";
import { UserNotFoundExceptionUseCase } from "../exceptions/userNotFound.ts";

export class UsuarioForAuthUseCase {
    constructor(
        private repo: UsuarioRepository
    ){}

    async execute(params: AuthLoginDTO): Promise<UsuarioInfoDTO>{
        const validateExisteUsuario = await this.repo.getUsuarioByUsername(
            params.username
        );
        if (validateExisteUsuario === null) throw new UserNotFoundExceptionUseCase();

        void validateExisteUsuario.validateUsuarioWithRole();
        const { id: idUsuario, usuario: usuarioInfo } = validateExisteUsuario.toValue();
        const farmaciauth = validateExisteUsuario.asigneFarmacia(params.farmacia_auth.id_farmacia);
        return {
            id: idUsuario,
            id_role: usuarioInfo.id_role!,
            role: usuarioInfo.role!,
            farmacia: {
                id_farmacia: farmaciauth.id_farmacia,
                farmacia: farmaciauth.name_farmacia,
            },
            username: usuarioInfo.username,
            password: usuarioInfo.password,
        }
    }
}