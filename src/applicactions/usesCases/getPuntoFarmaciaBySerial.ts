import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
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

export class getPuntosFarmaciaBySerial {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        serial: string,
    ): Promise<PuntoDTO>{
        const puntos = await this.repoEquipo.getPuntoFarmaciaBySerial(
            dataUsuario.id_farmacia,
            serial
        );
        if (puntos === null) throw new DataNotFoundExceptionUseCase(
            'No se ah encontrado ningun punto con el serial',
            'Verifique el serial y vuelva a intentar',
            ''
        );
        return puntos.toValue();
    }
}