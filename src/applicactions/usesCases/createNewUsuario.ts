import { InfoUsuarioEntity } from "../../domain/entities/infoUsuario.ts";
import type { CreateUsuarioDTO } from "../dtosInterfaces/param/createUsuario.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class CreateNewUsuarioUseCase extends UsuarioRepoUsesCases {

    async execute(
        params: CreateUsuarioDTO
    ): Promise<InfoUsuarioEntity> {
        const validateUsuarioExist = await this.repo.getUsuarioByUsername(params.username);
        if (validateUsuarioExist) throw new Error('Usuario existente');

        const passwordHash = this.serviceHashData.hashData(params.password);
        const createUsuario = await this.repo.createUsuario(
            InfoUsuarioEntity.build({
                id: 1,
                ape: params.ape,
                contact: params.contact,
                role: params.role,
                id_role: params.id_role,
                name: params.name,
                password: passwordHash,
                username: params.username
            })
        );
        return createUsuario;
    }  
}