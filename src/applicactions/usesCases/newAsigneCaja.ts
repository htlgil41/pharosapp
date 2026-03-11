import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataAlredyExistsExceptionUseCase } from "../exceptions/dataAlredyExists.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface CajaAsignerDTO {
    id_farmacia: number;
    id_equipo: number;
    nmCaja: number;
}

export class NewAsigneCajaUseCase {
    constructor(
        private repoFarmacia: FarmaciaRepository,
        private repoEquipo: EquiposRepository
    ){}

    async erxecute(
        dataUsuario: DataAccessToken,
        dto: CajaAsignerDTO
    ): Promise<void> {
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();

        const [
            isAsigne,
            farmacia,
            equipo,
        ] = await Promise.all([
            this.repoFarmacia.getAsigneCajaByNm(dto.id_farmacia, dto.nmCaja),
            this.repoFarmacia.getFarmaciaById(dto.id_farmacia),
            this.repoEquipo.getEquipoPcById(dataUsuario.id_farmacia, dto.id_equipo),
        ]);
        if (isAsigne) {
            const asigne = isAsigne.toValue();
            throw new DataAlredyExistsExceptionUseCase(
                'Se ha encontrado una asignacion lista',
                `Esta caja tiene una asignacion -> ${asigne.resum_equipo}`,
                ''
            );
        }
        if (!farmacia) throw new DataNotFoundExceptionUseCase(
            'No existe la farmacia en la cual deseas hacer la asignacion',
            'Valida la farmacia para poder realizar la operacion',
            ''
        );
        if (!equipo) throw new DataNotFoundExceptionUseCase(
            'El equipo que desas asignar no existe',
            'Valida la farmacia para poder realizar la operacion',
            ''
        );

        // TODO
    }
}