import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface FarmaciaDTO {
    id: number;
    farmacia: string | null;
    area: string;
    nm_caja: number;
}

export class GetCajaByAreaUseCase {
    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        search: string,
    ): Promise<FarmaciaDTO[]>{
        if (!ServiceAuthorization.accessMulti(['coordinador', 'administrador'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        const caja = await this.repo.getCajaByArea(
            dataUsuario.id_farmacia,
            search
        );
        
        if (caja.length === 0) return [];
        const primitiveFarmcias = caja.map(f => f.toValue());
        return primitiveFarmcias.map(f  => ({
            id: f.id,
            area: f.area,
            farmacia: f.name_farmacia,
            nm_caja: f.nm_caja,            
        }));
    }
}