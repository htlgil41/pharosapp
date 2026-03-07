import type { Request, Response } from 'express';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';
import { CreateNewUsuarioUseCase } from '../../../../applicactions/usesCases/createNewUsuario.ts';
import type { AuthLoginIUnterface, NewUserInterface } from '../jois/interfaces/newuser.ts';
import { UsuarioForAuthUseCase } from '../../../../applicactions/usesCases/usuarioForAuth.ts';
import { CookiSetHeaders } from '../../../shareds/cookie.ts';

export class AuthRoute {

    async newUsuario(req: Request, res: Response): Promise<void>{
        const createUsuarioUseCase = new CreateNewUsuarioUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body =  req.body as NewUserInterface;
        try {

            const [
                createdUser,
                error
            ] = await createUsuarioUseCase.execute({
                id_role: body.id_role ?? null,
                name: body.name_user,
                ape: body.ape,
                contact: body.contact ?? null,
                password: body.pass,
                username: body.username
            });

            if (error !== null){

                res.json({
                    error: {
                        error: error.error,
                        fix: error.fix
                    },
                });
                return;
            }
            if (createdUser === null) {
                res.json({
                    error: {
                        error: 'No se ha podido construir la informcaion correctamente',
                        fix: 'Error muy inesperado',
                    },
                });
                return;
            }
            
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
        const authLoginUseCase = new UsuarioForAuthUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body = req.body as AuthLoginIUnterface;
        try {

            const [userForAuthToken, error] = await authLoginUseCase.execute({
                username: body.username,
                password: body.password,
                farmacia_auth: body.farmacia_auth,
            });

            if (error !== null) {
                res.json({
                    error: {
                        error: error.error,
                        fix: error.fix,
                    },
                });
                return;
            }
            if (userForAuthToken === null) {

                res.json({
                    error: {
                        error: 'No se ha podido construir la informcaion correctamente',
                        fix: 'Error muy inesperado',
                    },
                });
                return
            }

            const [
                ac_cookies,
                rt_cookie
            ] = [
                CookiSetHeaders(
                    60,
                    'at',
                    userForAuthToken.token_access
                ),
                CookiSetHeaders(
                    60,
                    'rt',
                    userForAuthToken.token_refresh
                ),
            ];

            res.setHeader('Set-Cookie', [ac_cookies, rt_cookie])
            res.json("oberva las cookies!!!");
            return
        } catch (error) {
            
            console.log(error);
            throw new Error('new usuario');
        }
    }
}