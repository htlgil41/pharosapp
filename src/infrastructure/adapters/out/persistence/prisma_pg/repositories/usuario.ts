import { FarmaciaEntity } from "../../../../../../domain/entities/farmacia.ts";
import type { InfoUsuarioEntity } from "../../../../../../domain/entities/infoUsuario.ts";
import { RoleUserEntity } from "../../../../../../domain/entities/roleUser.ts";
import { UsuarioByFarmaciaEntity } from "../../../../../../domain/entities/usuarioFarmacia.ts";
import type { UsuarioRepository } from "../../../../../../domain/repositories/usuarios.ts";
import { ErrorPrismaExceptions } from "../exceptions/errosManager.ts";
import { type PrismaClient } from "../models/client/client.ts";

export class UsuarioRepositoryPrismaPg implements UsuarioRepository {

    constructor(
        private conn: PrismaClient
    ){}

    async createUsuario(
        usuario: InfoUsuarioEntity,
        role: RoleUserEntity,
    ): Promise<InfoUsuarioEntity> {
        
        const rolePrimitive = role.toValue();
        const usuarioForCreate = usuario.toValue();
        try {
            
            const createdUsuario = await this.conn.usuario.create({
                data: {
                    id_role: rolePrimitive.id,
                    name_user: usuarioForCreate.name,
                    ape: usuarioForCreate.ape,
                    username: usuarioForCreate.username,
                    pass: usuarioForCreate.password,
                    contact: usuarioForCreate.contact
                },
                select: {
                    id: true,
                }
            })

            usuario.setId(createdUsuario.id);
            return usuario;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getRoles(): Promise<RoleUserEntity[]> {
        try {
            
            const roleBy = await this.conn.usuario_role.findMany({
                select: {
                    id: true,
                    rolee: true,
                },
            });
   
            return roleBy.map(r => RoleUserEntity.build({
                id: r.id,
                role: r.rolee
            }));
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getRoleById(id_role: number): Promise<RoleUserEntity | null> {
        try {
            
            const roleBy = await this.conn.usuario_role.findUnique({
                where: {
                    id: id_role,
                },
                select: {
                    id: true,
                    rolee: true,
                },
            });
            
            if (roleBy === null) return null;
            return RoleUserEntity.build({
                id: roleBy.id,
                role: roleBy.rolee
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getUsuarioByUsername(username: string): Promise<UsuarioByFarmaciaEntity | null> {
        try {
            
            const user = await this.conn.usuario.findUnique({
                where: {
                    username
                },
                select: {
                    id: true,
                    name_user: true,
                    ape: true,
                    username: true,
                    pass: true,
                    contact: true,
                    usuario_role: {
                        select: {
                            id: true,
                            rolee: true,
                        },
                    },
                    usuario_by_farmacia: {
                        select: {
                            id: true,
                            name_farmacia: true,
                            id_farmacia: true,
                        },
                    },
                },
            });

            if (user === null) return null;
            return UsuarioByFarmaciaEntity.build({
                id: user.id,
                farmacias_asigne: user.usuario_by_farmacia,
                usuario: {
                    role: user.usuario_role ? user.usuario_role.rolee : null,
                    id_role: user.usuario_role ? user.usuario_role.id : null,
                    name: user.name_user,
                    ape: user.ape,
                    password: user.pass,
                    username: user.username
                },
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getFarmciasAsgineByUsuario(id_usuario: number): Promise<FarmaciaEntity[]> {
        try {
            
            const farmacias = await this.conn.farmacias.findMany({
                where: {
                    usuario_by_farmacia: {
                        some: {
                            id_usuario
                        }
                    }
                },
                select: {
                    id: true,
                    name_farmacia: true,
                    direccion: true,
                    rif: true,
                    some_code: true,
                },
            });

            if (farmacias.length === 0) return [];
            return farmacias.map(f => FarmaciaEntity.build({
                id: f.id,
                name_farmcia: f.name_farmacia,
                rif: f.rif,
                direccion: f.direccion,
                some_code: f.some_code
            }));
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
}