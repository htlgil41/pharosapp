import type { InfoUsuarioEntity } from "../../../../../../domain/entities/infoUsuario.ts";
import { UsuarioByFarmaciaEntity } from "../../../../../../domain/entities/usuarioFarmacia.ts";
import type { UsuarioRepository } from "../../../../../../domain/repositories/usuarios.ts";
import type { PrismaClient } from "../models/client/client.ts";

export class UsuarioRepositoryPrismaPg implements UsuarioRepository {

    constructor(
        private conn: PrismaClient
    ){}

    async createUsuario(usuario: InfoUsuarioEntity): Promise<InfoUsuarioEntity> {
        
        const usuarioForCreate = usuario.toValue();
        try {
            
            const createdUsuario = await this.conn.usuario.create({
                data: {
                    id_role: usuarioForCreate.id_role,
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
            
            throw new Error("Error DB");
        }
    }

    async GetUsuarioByUsername(username: string): Promise<UsuarioByFarmaciaEntity | null> {
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
                farmacias_asigne: [],
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
            
            throw new Error("Error DB");
        }
    }
}