import type { Request, Response } from 'express';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';
import { CreateNewUsuarioUseCase } from '../../../../applicactions/usesCases/createNewUsuario.ts';
import type { AuthLoginIUnterface, NewUserInterface, SwitchMpLoginInterface } from '../jois/interfaces/newuser.ts';
import { UsuarioForAuthUseCase } from '../../../../applicactions/usesCases/usuarioForAuth.ts';
import { CookieParse, CookiSetHeaders } from '../../../shareds/cookie.ts';
import { RefreshTokenUseCase } from '../../../../applicactions/usesCases/refreshToken.ts';
import { SwitchMpUseCase } from '../../../../applicactions/usesCases/switchMp.ts';

export class AuthRoute {

    async newUsuario(req: Request, res: Response): Promise<void>{
        const createUsuarioUseCase = new CreateNewUsuarioUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body =  req.body as NewUserInterface;
        const tokenAccessCookie = CookieParse(
            req.headers.cookie ?? ''
        );
        if (!tokenAccessCookie['at']) {
            res.json({
                error: {
                    error: 'No se econtro la identificaion',
                    fix: 'No se ha encontrado los datos para continuar. Ingrese nuevamente'
                }
            });
            return;
        }

        try {
            const createdUser = await createUsuarioUseCase.execute(
                {
                    id: 0,
                    farmacia: '',
                    id_farmacia: 1,
                    id_role: 1,
                    role: '',
                    username: '',
                },
                {
                    id_role: body.id_role ?? null,
                    name: body.name_user,
                    ape: body.ape,
                    contact: body.contact ?? null,
                    password: body.pass,
                    username: body.username
                },
            );

            res.json({
                data: createdUser,
                op: new Date(),
            });
            return
        } catch (error) {
            res.json(error);
        }
    }

    async login(req: Request, res: Response): Promise<void>{
        const authLoginUseCase = new UsuarioForAuthUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body = req.body as AuthLoginIUnterface;
        try {
            const userForAuthToken = await authLoginUseCase.execute({
                username: body.username,
                password: body.password,
                farmacia_auth: body.farmacia_auth,
            });

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
            res.json(error);
        }
    }

    async changeFarmacia(req: Request, res: Response){
        const switchFarmaciaUseCase = new SwitchMpUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body = req.body as SwitchMpLoginInterface;
        const tokensCookies = CookieParse(
            req.headers.cookie ?? ''
        );
        if (!tokensCookies['at']) {
            res.json({
                error: {
                    error: 'No se econtro la identificaion',
                    fix: 'No se ha encontrado los datos para continuar. Ingrese nuevamente'
                }
            });
            return;
        }
        
        try {
            
            const { token_access, token_refresh } = await switchFarmaciaUseCase.execute(
                {
                    id: 0,
                    farmacia: '',
                    id_farmacia: 1,
                    id_role: 1,
                    role: '',
                    username: '',
                },
                body.id_farmacia
            );

            res.setHeader('Set-Cookie', [token_access, token_refresh])
            res.json("oberva las cookies!!!");
        } catch (error) {
            res.json(error);
        }
    }

    async refresh(req: Request, res: Response) {

        const refreshTokenUseCase = new RefreshTokenUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const tokensCookies = CookieParse(
            req.headers.cookie ?? ''
        );
        if (
            !tokensCookies['at'] ||
            !tokensCookies['rt']
        ) {
            res.json({
                error: {
                    error: 'No se econtro la identificaion',
                    fix: 'No se ha encontrado los datos para continuar. Ingrese nuevamente'
                }
            });
            return;
        }
        try {
            
            const { token_access, token_refresh } = await refreshTokenUseCase.execute(
                {
                    id: 0,
                    farmacia: '',
                    id_farmacia: 1,
                    id_role: 1,
                    role: '',
                    username: '',
                },
                {
                    id: 1,
                    farmacia: {
                        id_farmacia: 4,
                        farmacia: '',
                    },
                    username: '',
                    date: new Date(),
                }
            );

            const [
                ac_cookies,
                rt_cookie
            ] = [
                CookiSetHeaders(
                    60,
                    'at',
                    token_access
                ),
                CookiSetHeaders(
                    60,
                    'rt',
                    token_refresh
                ),
            ];

            res.setHeader('Set-Cookie', [ac_cookies, rt_cookie])
            res.json("oberva las cookies!!!");
            return
        } catch (error) {
            res.json(error);
        }
    }
}