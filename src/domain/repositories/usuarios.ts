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
    getUsuarioInfoById(
        id_usuario: number
    ): Promise<InfoUsuarioEntity | null>;
    getUsuarioInfoByUsername(
        username: string
    ): Promise<InfoUsuarioEntity | null>;
    getFarmciasAsgineByUsuario(id_usuario: number): Promise<FarmaciaEntity[]>;
    getFarmciaAsgineByUsuario(
        id_usuario: number,
        id_farmacia: number
    ): Promise<FarmaciaEntity | null>;

    getAsigneFarmciaUsuario(
        id_farmacia: number,
        id_usuario: number
    ): Promise<FarmaciaEntity | null>;
    asigneFarmacia(
        usuario: InfoUsuarioEntity,
        farmacia: FarmaciaEntity,
    ): Promise<FarmaciaEntity>;
    upRoleUsuario(
        role: RoleUserEntity,
        upUser: InfoUsuarioEntity
    ): Promise<InfoUsuarioEntity>;

    updateAsigneRolUser(
        role: RoleUserEntity,
        usuario: InfoUsuarioEntity
    ): Promise<InfoUsuarioEntity>;
    deleteAsineFarmacia(
        usuario: InfoUsuarioEntity,
        farmacia: FarmaciaEntity,
    ): Promise<FarmaciaEntity>;
}