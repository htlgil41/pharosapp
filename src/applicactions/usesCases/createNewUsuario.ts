import { InfoUsuarioEntity } from "../../domain/entities/infoUsuario.ts";
import type { CreateUsuarioDTO } from "../dtosInterfaces/param/createUsuario.ts";
import type { CreatedUserResponse } from "../dtosInterfaces/response/createdUser.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { RoleNotFoundExceptionUseCase } from "../exceptions/roleNotFound.ts";
import { UserAlredyExistsExceptionUseCase } from "../exceptions/userAlredyExists.ts";
import { ServiceAuthorization } from "../services/authorization.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class CreateNewUsuarioUseCase extends UsuarioRepoUsesCases {

    async execute(
        params: CreateUsuarioDTO,
        at: string,
    ): Promise<CreatedUserResponse> {
        const dataToken = await this.serviceJoseToken.validateAccessToken(at);
        if (!ServiceAuthorization.accessOnly('coordinador', dataToken.role))
            throw new AuthorizationExceptionUseCase();

        const [
            role,
            validateUsuarioExist
        ] = await Promise.all([
            this.repo.getRoleById(params.id_role),
            await this.repo.getUsuarioByUsername(params.username),
        ]);
        
        if (role === null) throw new RoleNotFoundExceptionUseCase();
        if (validateUsuarioExist) throw new UserAlredyExistsExceptionUseCase();

        const passwordHash = this.serviceHashData.hashData(params.password);
        const rolePrimitive = role.toValue();
        const createUsuario = await this.repo.createUsuario(
            InfoUsuarioEntity.build({
                id: 1,
                ape: params.ape,
                contact: params.contact,
                role: rolePrimitive.role,
                id_role: rolePrimitive.id,
                name: params.name,
                password: passwordHash,
                username: params.username
            }),
            role
        );
        const userPrimitive = createUsuario.toValue();
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