import { InfoUsuarioEntity } from "../../domain/entities/infoUsuario.ts";
import type { CreateUsuarioDTO } from "../dtosInterfaces/param/createUsuario.ts";
import type { CreatedUserResponse } from "../dtosInterfaces/response/createdUser.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { ErrorResponseException } from "../exceptions/responseError.ts";
import { ServiceAuthorization } from "../services/authorization.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class CreateNewUsuarioUseCase extends UsuarioRepoUsesCases {

    async execute(
        params: CreateUsuarioDTO,
        at: string,
    ): Promise<[CreatedUserResponse | null, ErrorResponseException | null]> {
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
        
        if (role === null) return [
            null,
            new ErrorResponseException(
                'No existe el role',
                'El usuario no puede pertenecer al rolo deseado ya que no especifica ninguna regla',
                ''
            )
        ];
        if (validateUsuarioExist) return [
            null,
            new ErrorResponseException(
                'El usuario ya se encuentra registrado',
                'Tu estas dentro ve e inicia!',
                ''
            )
        ];

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
        return [
            {
                fullname: `${userPrimitive.name} ${userPrimitive.ape}`,
                resum: userPrimitive.contact !== null 
                    ? `Usuario contactado por ${userPrimitive.contact}` 
                    : 'El usuario no posee una referencia de contacto',
                username: userPrimitive.username,
                add: new Date(),
            },
            null
        ];
    }  
}