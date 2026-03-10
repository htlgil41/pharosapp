import { InfoUsuarioEntity } from "../../domain/entities/infoUsuario.ts";
import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataAlredyExistsExceptionUseCase } from "../exceptions/dataAlredyExists.ts";
import { RoleNotFoundExceptionUseCase } from "../exceptions/roleNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface CreateUsuarioDTO {
    ape: string;
    contact: string | null;
    id_role: number;
    name: string;
    password: string;
    username: string;
}

interface CreatedUserDTO {
    fullname: string;
    username: string;
    resum: string;
    add: Date;
}

export class CreateNewUsuarioUseCase {
    constructor(
        private repo: UsuarioRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        params: CreateUsuarioDTO,
    ): Promise<CreatedUserDTO> {

        if (!ServiceAuthorization.accessOnly('coordinador', dataUsuario.role))
            throw new AuthorizationExceptionUseCase();

        const [
            role,
            validateUsuarioExist
        ] = await Promise.all([
            this.repo.getRoleById(params.id_role),
            await this.repo.getUsuarioByUsername(params.username),
        ]);
        
        if (role === null) throw new RoleNotFoundExceptionUseCase();
        if (validateUsuarioExist) throw new DataAlredyExistsExceptionUseCase(
            'Ya existe un usuario con informacion similar',
            'Intenta iniciar con estas mismas credenciales',
            ''
        );
        const rolePrimitive = role.toValue();
        const createUsuario = await this.repo.createUsuario(
            InfoUsuarioEntity.build({
                id: 1,
                ape: params.ape,
                contact: params.contact,
                role: rolePrimitive.role,
                id_role: rolePrimitive.id,
                name: params.name,
                password: params.password,
                username: params.username
            }),
            role
        );

        const createdNewUser = await this.repo.createUsuario(
            createUsuario,
            role,
        );
        const userPrimitive = createdNewUser.toValue();
        return  {
            fullname: `${userPrimitive.name} ${userPrimitive.ape}`,
            resum: userPrimitive.contact !== null 
                ? `Usuario contactado por ${userPrimitive.contact}` 
                : 'El usuario no posee una referencia de contacto',
            username: userPrimitive.username,
            add: new Date(),
        };
    }  
}