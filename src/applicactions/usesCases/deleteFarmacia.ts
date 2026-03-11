import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface FarmaciaDTO {
    id: number;
    some_code: string;
    name_farmcia: string;
    rif: string;
    direccion: string | null;   
}

export class DeleteFarmaciaLikeUseCase {
    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
    ): Promise<FarmaciaDTO>{
        if (!ServiceAuthorization.accessOnly('coordinador', dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        
        const farmacia = await this.repo.getFarmaciaById(dataUsuario.id_farmacia);
        if (farmacia === null) throw new DataNotFoundExceptionUseCase(
            'No se ha encontrado la farmcia',
            'Puede que la farmacia ya no este en los registros',
            ''
        );
        await this.repo.deleteFarmacia(farmacia);
        return farmacia.toValue();
    }
}