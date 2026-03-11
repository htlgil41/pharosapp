import { CajaFarmaciaEntity } from "../../domain/entities/cajaFarmacia.ts";
import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface NewCajaDTO {
    nmCaja: number;
    area: string
}

interface CajaDTO {
    farmacia: string;
    nmCaja: number
}

export class NewCajaFarmaciaUseCase {
    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        dto: NewCajaDTO,
    ): Promise<CajaDTO> {
        
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();

        const farmacia = await this.repo.getFarmaciaById(dataUsuario.id_farmacia);
        if (!farmacia) throw new DataNotFoundExceptionUseCase(
            'No se encontro la farmacia',
            'La farmacia no existe por lo la caja no puede ser creada verifica la informacion e intenta nuevamente',
            ''
        );

        const farmaciaPrimitive = farmacia.toValue();
        const createCaja = await this.repo.creteCajaFarmacia(
            farmacia,
            CajaFarmaciaEntity.build({
                id: 1,
                area: dto.area,
                id_farmacia: farmaciaPrimitive.id,
                name_farmacia: farmaciaPrimitive.name_farmcia,
                nm_caja: dto.nmCaja
            }),
        );
        return {
            farmacia: farmaciaPrimitive.name_farmcia,
            nmCaja: dto.nmCaja,
        };
    }
}