import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { FarmaciasResponse } from "../dtosInterfaces/response/farmacias.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { ServiceAuthorization } from "../services/authorization.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class getFarmciasAsignesUseCase extends UsuarioRepoUsesCases {

    async execute(
        id_usuario: number,
        at: string
    ): Promise<FarmaciasResponse[]> {
        const dataToken = await this.serviceJoseToken.validateAccessToken(at);
        if (!ServiceAuthorization.accessMulti(['coordinador', 'administrador'], dataToken.role))
            throw new AuthorizationExceptionUseCase();

        const farmciasAsigneEntity = await this.repo.getFarmciasAsgineByUsuario(id_usuario);
        
        const countFarmacia = farmciasAsigneEntity.length;
        if (countFarmacia === 0) throw new FarmaciaNotAsigneUsuarioExceptionDomain(countFarmacia);

        const farmaciasPrimitives = farmciasAsigneEntity.map(f => f.toValue());
        return farmaciasPrimitives.map(f => ({
            id: f.id,
            name_farmacia: f.name_farmcia,
            direccion: f.direccion,
            rif: f.rif,
            some_code: f.some_code
        }));
    }
}