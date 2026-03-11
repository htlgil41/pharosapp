import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface FarmaciaDTO {
    id: number;
    farmacia: string | null;
    area: string;
    nm_caja: number;
}

export class GetCajaByNumeroUseCase {
    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        numero: number,
    ): Promise<FarmaciaDTO>{
        if (!ServiceAuthorization.accessMulti(['coordinador', 'administrador'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        const caja = await this.repo.getCajaByNm(
            dataUsuario.id_farmacia,
            numero
        );
        
        if (caja === null) throw new DataNotFoundExceptionUseCase(
            `No existe la caja con el numner #${numero}`,
            'Verifique el numeor de caja de las farmacias',
            ''
        );
        const primitiveFarmcias = caja.toValue();
        return {
            id: primitiveFarmcias.id,
            area: primitiveFarmcias.area,
            farmacia: primitiveFarmcias.name_farmacia,
            nm_caja: primitiveFarmcias.nm_caja, 
        }
    }
}