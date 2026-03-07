import type { Request, Response } from 'express';
import { UsuarioForAuthUseCase } from '../../../../applicactions/usesCases/usuarioForAuth.ts';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';

export class AuthRoute {

    async newUsuario(req: Request, res: Response): Promise<void>{

        const createUsuarioUseCase = new UsuarioForAuthUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        
        try {
            
            res.json(req.body);
        } catch (error) {
            
            throw new Error('new usuario');
        }
    }

    async login(req: Request, res: Response): Promise<void>{

        try {
            
            console.log(req.body);
            res.json("si");
        } catch (error) {
            
            throw new Error('new usuario');
        }
    }
}