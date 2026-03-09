import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { FarmaciasResponse } from "../dtosInterfaces/response/farmacias.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class getFarmciasAsignesUseCase extends UsuarioRepoUsesCases {

    async execute(dataUsuario: DataAccessToken): Promise<FarmaciasResponse[]> {
        const farmciasAsigneEntity = await this.repo.getFarmciasAsgineByUsuario(dataUsuario.id);
        
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