import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import type { UsuarioInfoDTO } from "../dtosInterfaces/datatoken.ts";
import { TokenErrorExceptionUseCase } from "../exceptions/tokenError.ts";
import type { DataRefreshToken } from "../ports/token.ts";

export class RefreshTokenUseCase {
    constructor(
        private repo: UsuarioRepository
    ){}

    async execute(dataSession: DataRefreshToken): Promise<UsuarioInfoDTO> {
        const inforUserForCreateToken = await this.repo.getUsuarioByUsername(dataSession.username);
        if (inforUserForCreateToken === null)
            throw new TokenErrorExceptionUseCase(
                'No se ha encontrado la informacion para renovar su token',
                'Esto es un problema inesperado ya que no se identifico la informacion del token',
                ''
            );
        void inforUserForCreateToken.validateUsuarioWithRole();
        const {
            id: idUsuario,
            usuario: usuarioInfo
        } = inforUserForCreateToken.toValue();

        return {
            id: idUsuario,
            id_role: usuarioInfo.id_role!,
            role: usuarioInfo.role!,
            farmacia: dataSession.farmacia,
            username: usuarioInfo.username,
            password: usuarioInfo.password,
        };
    }
}