import { DeleteEquipoPcAggregate } from "../../domain/aggregates/deleteEquipoPc.ts";
import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

export class DeletePcUseCase {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        id_equipo: number,
        nota: string,
    ): Promise<boolean> {
        if (ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        const pcEquipo = await this.repoEquipo.getEquipoPcById(
            dataUsuario.id_farmacia,
            id_equipo,
        );
        if (pcEquipo === null) throw new DataNotFoundExceptionUseCase(
            'No se ha encontrado el equipo',
            'Verifique que el equipo sea de la farmacia',
            ''
        );

        const deleted = await this.repoEquipo.deleteEquipoPc(new DeleteEquipoPcAggregate(
           pcEquipo,
           nota
        ));
        return true;
    }
}