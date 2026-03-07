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

            const createdUser = await createUsuarioUseCase.execute({
                id_role: body.id_role ?? null,
                name: body.name_user,
                ape: body.ape,
                contact: body.contact ?? null,
                password: body.pass,
                username: body.username
            });
            
            res.json({
                data: createdUser,
                op: new Date(),
            });
            return
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