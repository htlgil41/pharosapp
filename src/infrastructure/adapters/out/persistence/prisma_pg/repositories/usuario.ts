import { FarmaciaEntity } from "../../../../../../domain/entities/farmacia.ts";
import { InfoUsuarioEntity } from "../../../../../../domain/entities/infoUsuario.ts";
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
                select: { id: true }
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

    async getUsuarioInfoById(id_usuario: number): Promise<InfoUsuarioEntity | null> {
        try {
            
            const user = await this.conn.usuario.findUnique({
                where: {
                    id: id_usuario,
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
                },
            });

            if (user === null) return null;
            return InfoUsuarioEntity.build({
                id: user.id,
                name: user.name_user,
                ape: user.ape,
                contact: user.contact,
                id_role: user.usuario_role?.id ?? null,
                role: user.usuario_role?.rolee ?? null,
                password: user.pass,
                username: user.username,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getUsuarioInfoByUsername(username: string): Promise<InfoUsuarioEntity | null> {
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
                },
            });

            if (user === null) return null;
            return InfoUsuarioEntity.build({
                id: user.id,
                name: user.name_user,
                ape: user.ape,
                contact: user.contact,
                id_role: user.usuario_role?.id ?? null,
                role: user.usuario_role?.rolee ?? null,
                password: user.pass,
                username: user.username,
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
    
    async getFarmciaAsgineByUsuario(id_usuario: number, id_farmacia: number): Promise<FarmaciaEntity | null> {
        try {
            
            const farmacia = await this.conn.usuario_by_farmacia.findFirst({
                where: {
                    id_usuario,
                    id_farmacia,
                },
                select: {
                    farmacias: {
                        select: {
                            id: true,
                            name_farmacia: true,
                            rif: true,
                            direccion: true,
                            some_code: true,
                        },
                    },
                },
            });

            if (farmacia === null) return null;
            return FarmaciaEntity.build({
                id: farmacia.farmacias.id,
                name_farmcia: farmacia.farmacias.name_farmacia,
                rif: farmacia.farmacias.rif,
                direccion: farmacia.farmacias.direccion,
                some_code: farmacia.farmacias.some_code
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async getAsigneFarmciaUsuario(id_farmacia: number, id_usuario: number): Promise<FarmaciaEntity | null> {
        try {
            
            const asigne = await this.conn.usuario_by_farmacia.findFirst({
                where: {
                    id_farmacia,
                    id_usuario
                },
                select: {
                    farmacias: {
                        select: {
                            id: true,
                            name_farmacia: true,
                            direccion: true,
                            some_code: true,
                            rif: true,
                        },
                    },
                },
            });

            if (asigne === null) return null;
            return FarmaciaEntity.build({
                id: asigne.farmacias.id,
                name_farmcia: asigne.farmacias.name_farmacia,
                rif: asigne.farmacias.rif,
                direccion: asigne.farmacias.direccion,
                some_code: asigne.farmacias.some_code,
            });
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
    
    async asigneFarmacia(usuario: InfoUsuarioEntity, farmacia: FarmaciaEntity): Promise<FarmaciaEntity> {
        const usuarioPrimitive = usuario.toValue();
        const farmaciaPriimtive = farmacia.toValue();
        try {
            await this.conn.usuario_by_farmacia.create({
                data: {
                    name_farmacia: farmaciaPriimtive.name_farmcia,
                    id_farmacia: farmaciaPriimtive.id,
                    id_usuario: usuarioPrimitive.id,
                },
            });

            return farmacia;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async upRoleUsuario(role: RoleUserEntity, upUser: InfoUsuarioEntity): Promise<InfoUsuarioEntity> {
        const rolePrimitive = role.toValue();
        const userUpdat = upUser.toValue();
        try {
            
            await this.conn.usuario.update({
                where: {
                    id: userUpdat.id,
                    username: userUpdat.username,
                },
                data: {
                    id_role: rolePrimitive.id,
                    name_user: userUpdat.name,
                    ape: userUpdat.ape,
                    contact: userUpdat.contact,
                }
            });

            return upUser;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async updateAsigneRolUser(role: RoleUserEntity, usuario: InfoUsuarioEntity): Promise<InfoUsuarioEntity> {
        const rolePrimitive = role.toValue();
        const usuarioPrimitive = usuario.toValue();
        try {
            const asigne = await this.conn.usuario.update({
                where: {
                    id: usuarioPrimitive.id
                },
                data: { id_role: rolePrimitive.id},
            });
            usuario.updateInfoUsuario(
                rolePrimitive.role,
                rolePrimitive.id,
                usuarioPrimitive.name,
                usuarioPrimitive.ape ?? '',
                usuarioPrimitive.contact,
            );
            return usuario;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }

    async deleteAsineFarmacia(usuario: InfoUsuarioEntity, farmacia: FarmaciaEntity): Promise<FarmaciaEntity> {
        const usuarioPrimitive = usuario.toValue();
        const farmaciaPriimtive = farmacia.toValue();
        try {
            await this.conn.usuario_by_farmacia.deleteMany({
                where: {
                    id_farmacia: farmaciaPriimtive.id,
                    id_usuario: usuarioPrimitive.id,
                }
            });

            return farmacia;
        } catch (error) {
            throw ErrorPrismaExceptions(error);
        }
    }
}