import type { FarmaciaEntity } from "../entities/farmacia.ts";
import type { InfoUsuarioEntity } from "../entities/infoUsuario.ts";
import type { RoleUserEntity } from "../entities/roleUser.ts";
import type { UsuarioByFarmaciaEntity } from "../entities/usuarioFarmacia.ts";

export interface UsuarioRepository {
    createUsuario(
        usuario: InfoUsuarioEntity,
        role: RoleUserEntity
    ): Promise<InfoUsuarioEntity>;
    getRoles(): Promise<RoleUserEntity[]>;
    getRoleById(id_role: number): Promise<RoleUserEntity | null>;
    getUsuarioByUsername(
        username: string
    ): Promise<UsuarioByFarmaciaEntity | null>;
    getFarmciasAsgineByUsuario(id_usuario: number): Promise<FarmaciaEntity[]>;
    getFarmciaAsgineByUsuario(
        id_usuario: number,
        id_farmacia: number
    ): Promise<FarmaciaEntity | null>;
}