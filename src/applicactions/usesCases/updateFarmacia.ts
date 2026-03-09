import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface FarmaciaUpdateDTO {
    id: number;
    some_code: string,
    name_farmcia: string,
    rif: string,
    direccion: string | null,
}

export class UpdateFarmaciaUseCase {

    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        dto: FarmaciaUpdateDTO,
    ): Promise<FarmaciaUpdateDTO>{

        if (ServiceAuthorization.accessMulti(['coordinador'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        if (ServiceAuthorization.accessMulti(['coordinador', 'administrador'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        const farmacia = await this.repo.getFarmaciaById(dto.id);
        
        if (farmacia === null) throw new DataNotFoundExceptionUseCase(
            'No se ha podido encontrar la farmacia',
            'No se puede actualizar un registro que no existe, quieres registrar estos datos?',
            ''
        );

        farmacia.updateFarmacia(
          dto.some_code,
          dto.name_farmcia,
          dto.rif,
          dto.direccion  
        );
        return farmacia.toValue();
    }
}