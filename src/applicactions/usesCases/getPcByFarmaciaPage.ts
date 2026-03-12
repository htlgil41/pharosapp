import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import type { DataAccessToken } from "../ports/token.ts";

interface PCsDTO {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    ip: string;
    anydesk: string | null;
    sa_anydesk: string | null;
    so: string;
    ram: number;
    disk: string;
    rom_size: number;
}

export class getPcByFarmaciaPage {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        page: number
    ): Promise<PCsDTO[]>{
        const pcs = await this.repoEquipo.getEqipoPcByFarmaciaPage(
            page,
            dataUsuario.id_farmacia
        );
        return pcs.map(p => p.toValue());
    }
}