import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface UpRoleUsuarioDTO {
    username: string;
    role: string;
    id_role: number;
    name: string;
    ape: string;
    contact: string;
}

interface UpdRoleUsuarioDTO {
    username: string;
    role: string | null;
    id_role: number | null;
    name: string;
    ape: string | null;
    contact: string | null;
}

export class GiveRoleUseCase {
    constructor(
        private repo: UsuarioRepository,
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        dto: UpRoleUsuarioDTO
    ): Promise<UpdRoleUsuarioDTO>{
        if (ServiceAuthorization.accessOnly('coordinador', dataUsuario.role))
            throw new AuthorizationExceptionUseCase();

        const [
            roleEntity,
            usuarioForUpdate
        ] = await Promise.all([
            this.repo.getRoleById(dto.id_role),
            this.repo.getUsuarioInfoByUsername(dto.username),
        ]);

        if (roleEntity === null) throw new DataNotFoundExceptionUseCase(
            'El role que desea cambiar no se encuentras',
            'No puede ingresar el role porque no existe',
            ''
        );
        if (usuarioForUpdate === null) throw new DataNotFoundExceptionUseCase(
            'El usuario no se encontro',
            'No se puede cambiar la informaciond el usuario ya que no se encontro',
            ''
        );

        const updated = await this.repo.upRoleUsuario(
            roleEntity,
            usuarioForUpdate
        );
        const updateRoleByUsuario = updated.toValue();
        return {
            username: updateRoleByUsuario.username,
            role: updateRoleByUsuario.role,
            id_role: updateRoleByUsuario.id_role,
            name: updateRoleByUsuario.name,
            ape: updateRoleByUsuario.ape,
            contact: updateRoleByUsuario.contact,
        };
    }
}