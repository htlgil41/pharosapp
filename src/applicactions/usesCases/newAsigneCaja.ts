import { CreateAsigneCajaFarmaciaAggregate } from "../../domain/aggregates/createAsigneCajaFarmacia.ts";
import { CajaFarmaciaEntity } from "../../domain/entities/cajaFarmacia.ts";
import type { PcEntity } from "../../domain/entities/pc.ts";
import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataAlredyExistsExceptionUseCase } from "../exceptions/dataAlredyExists.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface CajaAsignerDTO {
    id_equipo: number;
    nmCaja: number;
    area: string;
}

export class NewAsigneCajaUseCase {
    constructor(
        private repoFarmacia: FarmaciaRepository,
        private repoEquipo: EquiposRepository
    ){}

    async erxecute(
        dataUsuario: DataAccessToken,
        dto: CajaAsignerDTO
    ): Promise<string> {
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();

        const [
            isAsigne,
            equipo,
            caja
        ] = await Promise.all([
            this.repoFarmacia.getAsigneCajaByNm(dataUsuario.id_farmacia, dto.nmCaja),
            this.repoEquipo.getEquipoPcById(dataUsuario.id_farmacia, dto.id_equipo),
            this.repoFarmacia.getCajaByNm(dataUsuario.id_farmacia, dto.nmCaja),
        ]);
        if (isAsigne) {
            const asigne = isAsigne.toValue();
            throw new DataAlredyExistsExceptionUseCase(
                'Se ha encontrado una asignacion lista',
                `Esta caja tiene una asignacion -> ${asigne.resum_equipo}`,
                ''
            );
        }
        if (!caja) throw new  DataNotFoundExceptionUseCase(
            'La caja que desas asignar no existe',
            'Valida la farmacia para poder realizar la operacion',
            ''
        );
        if (!equipo) throw new DataNotFoundExceptionUseCase(
            'El equipo que desas asignar no existe',
            'Valida la farmacia para poder realizar la operacion',
            ''
        );

        const equipoPrimitive = equipo.toValue();
        const cajaPrimitive = caja.toValue();
        const asigned = await this.repoFarmacia.createAsigneEquipoPc(new CreateAsigneCajaFarmaciaAggregate(
            CajaFarmaciaEntity.build({
                id: 1,
                id_farmacia: dataUsuario.id_farmacia,
                name_farmacia: dataUsuario.farmacia,
                area: dto.area,
                nm_caja: cajaPrimitive.nm_caja,
            }),
            equipo
        ));
        return `Caja #${cajaPrimitive.nm_caja} asignada`;
    }
}