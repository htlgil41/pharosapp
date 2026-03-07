import { InfoUsuarioEntity } from "../../domain/entities/infoUsuario.ts";
import type { CreateUsuarioDTO } from "../dtosInterfaces/param/createUsuario.ts";
import type { CreatedUserResponse } from "../dtosInterfaces/response/createdUser.ts";
import { UserAlredyExistsExceptionCase } from "../exceptions/userAlredyExists.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class CreateNewUsuarioUseCase extends UsuarioRepoUsesCases {

    async execute(
        params: CreateUsuarioDTO
    ): Promise<CreatedUserResponse> {
        const validateUsuarioExist = await this.repo.getUsuarioByUsername(params.username);
        if (validateUsuarioExist) throw new UserAlredyExistsExceptionCase();

        const passwordHash = this.serviceHashData.hashData(params.password);
        const createUsuario = await this.repo.createUsuario(
            InfoUsuarioEntity.build({
                id: 1,
                ape: params.ape,
                contact: params.contact,
                role: '',
                id_role: params.id_role,
                name: params.name,
                password: passwordHash,
                username: params.username
            })
        );
        const userPrimitive = createUsuario.toValue();
        return {
            fullname: `${userPrimitive.name} ${userPrimitive.ape}`,
            resum: userPrimitive.contact !== null 
                ? `Usuario contactado por ${userPrimitive.contact}` 
                : 'El usuario no posee una referencia de contacto',
            username: userPrimitive.username,
            add: new Date(),
        };
    }  
}