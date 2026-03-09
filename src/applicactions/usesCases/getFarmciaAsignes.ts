import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { FarmaciasResponse } from "../dtosInterfaces/farmacias.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class getFarmciasAsignesUseCase extends UsuarioRepoUsesCases {

    async execute(
        dataUsuario: DataAccessToken,
        id_usuario: number
    ): Promise<FarmaciasResponse[]> {
        if (!ServiceAuthorization.accessMulti(['coordinador', 'administrador'], dataUsuario.role))
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