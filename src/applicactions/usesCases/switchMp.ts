import { FarmaciaNotAsigneUsuarioExceptionDomain } from "../../domain/exceptions/farmaciaNotAsigneUsuario.ts";
import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import type { DataAccessToken, DataRefreshToken } from "../ports/token.ts";

export interface UsuarioInfoDTO {
  id: number;
  id_role: number;
  role: string;
  username: string;
  password: string;
  farmacia: {
    id_farmacia: number;
    farmacia: string | null;
  }
}

export class SwitchMpUseCase {
    constructor(
        private repo: UsuarioRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        dataSession: DataRefreshToken,
        id_farmacia: number,
    ): Promise<UsuarioInfoDTO> {
        const farmciasAsigneEntity = await this.repo.getFarmciaAsgineByUsuario(
            dataUsuario.id,
            id_farmacia
        );

        if (farmciasAsigneEntity === null) throw new FarmaciaNotAsigneUsuarioExceptionDomain(1);
        const farmaciaAsigne = farmciasAsigneEntity.toValue();
        dataUsuario = {
            ...dataUsuario,
            farmacia: farmaciaAsigne.name_farmcia,
            id_farmacia: farmaciaAsigne.id,
        };
        dataSession = {
            ...dataSession,
            farmacia: {
                id_farmacia: farmaciaAsigne.id,
                farmacia: farmaciaAsigne.name_farmcia,
            },
        };
        return {
            id: dataUsuario.id,
            id_role: dataUsuario.id_role,
            role: dataUsuario.role,
            farmacia: dataSession.farmacia,
            username: dataUsuario.username,
            password: '',
        };
    }
}