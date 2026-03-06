import type { InfoUsuarioEntity } from "../entities/infoUsuario.ts";
import type { UsuarioByFarmaciaEntity } from "../entities/usuarioFarmacia.ts";

export interface UsuarioRepository {
    createUsuario(
        usuario: InfoUsuarioEntity
    ): Promise<InfoUsuarioEntity>;
    GetUsuarioByUsername(
        username: string
    ): Promise<UsuarioByFarmaciaEntity | null>;
}