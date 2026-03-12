import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import type { DataAccessToken } from "../ports/token.ts";

interface ImpresorasDTO {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    modelo_print: string;
    marca: string;
    area: string;
    count_toners: number;
}

export class getImpresoraByFarmaciaPage {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        page: number
    ): Promise<ImpresorasDTO[]>{
        const impresoras = await this.repoEquipo.getEqipoImpresoraByFarmaciaPage(
            page,
            dataUsuario.id_farmacia
        );
        return impresoras.map(p => p.toValue());
    }
}