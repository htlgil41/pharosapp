import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataAlredyExistsExceptionUseCase } from "../exceptions/dataAlredyExists.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface UpRoleUsuarioDTO {
    id_usuario: number;
    id_role: number;
}

interface InfoUsuarioDTO {
    id: number;
    role: string | null;
    id_role: number | null;
    name: string;
    ape: string | null;
    username: string;
    contact: string | null;
}

export class UpdateRoleUsuarioUseCase {
    constructor(
        private repoUsuario: UsuarioRepository,
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        dto: UpRoleUsuarioDTO
    ): Promise<InfoUsuarioDTO> {
        if (!ServiceAuthorization.accessOnly('coordinador', dataUsuario.role))
                throw new AuthorizationExceptionUseCase();
        const [
            usuarioUpdateRole,
            role
        ] = await Promise.all([
            this.repoUsuario.getUsuarioInfoById(dto.id_usuario),
            this.repoUsuario.getRoleById(dto.id_role),
        ]);
        if (usuarioUpdateRole === null) throw new DataAlredyExistsExceptionUseCase(
            'No se encontro el usuario',
            'El usuario que intentas camabiar no se encontro, valida la informacion e intente nuevamente',
            ''
        );

        const usuarioPrimitive = usuarioUpdateRole.toValue();
        if (usuarioPrimitive.id_role === dto.id_role) return usuarioPrimitive;
        if (role === null) throw new DataAlredyExistsExceptionUseCase(
            'No se encontro el rol',
            'No se ha podido asignar el role del usuario ya que no existe',
            ''
        );
        const upRoleUsuario = await this.repoUsuario.upRoleUsuario(
            role,
            usuarioUpdateRole
        );
        const updateRolePrimtive = upRoleUsuario.toValue();
        return {
            id: updateRolePrimtive.id,
            role: updateRolePrimtive.role,
            id_role: updateRolePrimtive.id_role,
            name: updateRolePrimtive.name,
            ape: updateRolePrimtive.ape,
            username: updateRolePrimtive.username,
            contact: updateRolePrimtive.contact,
        };
    }
}