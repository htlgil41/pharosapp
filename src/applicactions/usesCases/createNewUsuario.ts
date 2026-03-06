import { InfoUsuarioEntity } from "../../domain/entities/infoUsuario.ts";
import type { CreateUsuarioParams } from "../dtosInterfaces/param/createUsuario.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class CreateNewUsuarioUseCase extends UsuarioRepoUsesCases {

    async execute(
        params: CreateUsuarioParams
    ): Promise<InfoUsuarioEntity> {

        // Service validateExists usuario
        const validateUsuarioExist = await this.repo.getUsuarioByUsername('');
        if (validateUsuarioExist) throw new Error('Usuario existente');

        // ServicewHashPassword
        const createUsuario = await this.repo.createUsuario(
            InfoUsuarioEntity.build({
                id: 1n,
                ape: params.ape,
                contact: params.contact,
                role: params.role,
                id_role: params.id_role,
                name: params.name,
                password: params.password,
                username: params.username
            })
        );

        return createUsuario;
    }  
}