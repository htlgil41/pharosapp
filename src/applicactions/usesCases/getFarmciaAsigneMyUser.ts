import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import type { DataAccessToken } from "../ports/token.ts";

export interface FarmaciasDTO {
    id: number;
    name_farmacia: string;
    rif: string;
    some_code: string;
    direccion: string | null;
}

export class getFarmciasAsignesUseCase {
    constructor(
        private repo: UsuarioRepository
    ){}

    async execute(dataUsuario: DataAccessToken): Promise<FarmaciasDTO[]> {
        const farmciasAsigneEntity = await this.repo.getFarmciasAsgineByUsuario(dataUsuario.id);
        const countFarmacia = farmciasAsigneEntity.length;
        if (countFarmacia === 0) throw new FarmaciaNotAsigneUsuarioExceptionDomain(countFarmacia);

        const farmaciasPrimitives = farmciasAsigneEntity.map(f => f.toValue());
        return farmaciasPrimitives.map(f => ({
            id: f.id,
            name_farmacia: f.name_farmcia,
            direccion: f.direccion,
            rif: f.rif,
            some_code: f.some_code
        }));
    }
}