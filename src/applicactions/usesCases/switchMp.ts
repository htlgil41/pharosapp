import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { DataSessionDTO } from "../dtosInterfaces/datatoken.ts";
import type { DataAccessToken, DataRefreshToken } from "../ports/token.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class SwitchMpUseCase extends UsuarioRepoUsesCases {

    async execute(
        dataUsuario: DataAccessToken,
        dataSession: DataRefreshToken,
        id_farmacia: number,
    ): Promise<DataSessionDTO> {
        const farmciasAsigneEntity = await this.repo.getFarmciaAsgineByUsuario(
            dataUsuario.id,
            id_farmacia
        );

        if (farmciasAsigneEntity === null) throw new FarmaciaNotAsigneUsuarioExceptionDomain(1);
        const farmaciaAsigne = farmciasAsigneEntity.toValue();
        dataUsuario = {
            ...dataUsuario,
            farmacia: farmaciaAsigne.name_farmcia,
            id_farmacia: farmaciaAsigne.id,
        };
        dataSession = {
            ...dataSession,
            farmacia: {
                id_farmacia: farmaciaAsigne.id,
                farmacia: farmaciaAsigne.name_farmcia,
            },
        };

        return {
            ac: dataUsuario,
            rt: dataSession,            
        };
    }
}