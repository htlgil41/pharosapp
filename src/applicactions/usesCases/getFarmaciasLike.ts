import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface FarmaciaDTO {
    id: number;
    some_code: string;
    name_farmcia: string;
    rif: string;
    direccion: string | null;   
}

export class GetFarmaciasLikeUseCase {
    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        search: string,
    ): Promise<FarmaciaDTO[]>{
        if (!ServiceAuthorization.accessMulti(['coordinador', 'administrador'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        const farmacias = await this.repo.getFarmaciaBy(search);
        
        if (farmacias.length === 0) return [];
        const primitiveFarmcias = farmacias.map(f => f.toValue());
        return primitiveFarmcias;
    }
}