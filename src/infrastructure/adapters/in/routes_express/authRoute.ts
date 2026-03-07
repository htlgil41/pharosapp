import type { Request, Response } from 'express';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';
import { CreateNewUsuarioUseCase } from '../../../../applicactions/usesCases/createNewUsuario.ts';
import type { NewUserInterface } from '../jois/interfaces/newuser.ts';

export class AuthRoute {

    async newUsuario(req: Request, res: Response): Promise<void>{

        const createUsuarioUseCase = new CreateNewUsuarioUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body =  req.body as NewUserInterface;
        
        try {

            const created = await createUsuarioUseCase.execute({
                id_role: null,
                role: null,
                name: 'aaron',
                ape: 'gil',
                contact: null,
                password: '2278123',
                username: 'htlgil'
            });
            console.log(created.toValue());
            
            res.json("ok - 200");
        } catch (error) {
            
            console.log(error);
            res.json("error");
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