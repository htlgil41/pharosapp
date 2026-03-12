import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import type { DataAccessToken } from "../ports/token.ts";

interface PuntoDTO {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    modelo: string;
    banco: string;
    serial_code: string;
    tag: string | null;
}

export class getPuntosByFarmaciaPage {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        page: number
    ): Promise<PuntoDTO[]>{
        const puntos = await this.repoEquipo.getPuntosByFarmaciaPage(
            page,
            dataUsuario.id_farmacia
        );
        return puntos.map(p => p.toValue());
    }
}