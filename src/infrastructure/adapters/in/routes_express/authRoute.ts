import type { Request, Response } from 'express';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';
import { CreateNewUsuarioUseCase } from '../../../../applicactions/usesCases/newUsuario.ts';
import type { AuthLoginIUnterface, NewUserInterface, SwitchMpLoginInterface } from '../jois/interfaces/newuser.ts';
import { UsuarioForAuthUseCase } from '../../../../applicactions/usesCases/usuarioForAuth.ts';
import { CookieParse, CookiSetHeaders } from '../../../shareds/cookie.ts';
import { RefreshTokenUseCase } from '../../../../applicactions/usesCases/refreshToken.ts';
import { SwitchMpUseCase } from '../../../../applicactions/usesCases/switchMp.ts';
import { TokenManajerJOSE } from '../../../shareds/josetoken.ts';
import { BcryptJHash } from '../../../shareds/bcrypt.ts';

export class AuthRoute {

    async newUsuario(req: Request, res: Response): Promise<void>{
        const tokenMamanget = new TokenManajerJOSE();
        const createUsuarioUseCase = new CreateNewUsuarioUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body =  req.body as NewUserInterface;

        const tokenAccessCookie = CookieParse(
            req.headers.cookie ?? ''
        );
        const cookieAt = tokenAccessCookie['at'];
        if (!cookieAt) {
            res.json({
                error: {
                    error: 'No se econtro la identificaion',
                    fix: 'No se ha encontrado los datos para continuar. Ingrese nuevamente'
                }
            });
            return;
        }
        try {

            const dataPayloadToken = await tokenMamanget.validateAccessToken(cookieAt);
            const createdUser = await createUsuarioUseCase.execute(
                dataPayloadToken,
                {
                    id_role: body.id_role ?? null,
                    name: body.name_user,
                    ape: body.ape,
                    contact: body.contact ?? null,
                    password: BcryptJHash.hashData(body.pass),
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
        const tokenMamanget = new TokenManajerJOSE();
        const authLoginUseCase = new UsuarioForAuthUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body = req.body as AuthLoginIUnterface;
        try {
            const dataUsuario = await authLoginUseCase.execute({
                username: body.username,
                password: body.password,
                farmacia_auth: body.farmacia_auth,
            });
            if (!BcryptJHash.validateHash(dataUsuario.password, body.password)) {
                res.json("Pass invalida");
                return;
            }
            const [ at, rt] = await Promise.all([
                tokenMamanget.generateAccessToken(
                    {
                        id: dataUsuario.id,
                        username: dataUsuario.username,
                        id_farmacia: dataUsuario.farmacia.id_farmacia,
                        farmacia: dataUsuario.farmacia.farmacia,
                        id_role: dataUsuario.id_role,
                        role: dataUsuario.role, 
                    },
                    8
                ),
                tokenMamanget.generateRefresToken(
                    {
                        id: dataUsuario.id,
                        username: dataUsuario.username,
                        farmacia: dataUsuario.farmacia,
                        date: new Date(),
                    },
                    10080 * 4
                )
            ]);

            const [
                ac_cookies,
                rt_cookie
            ] = [
                CookiSetHeaders(
                    60,
                    'at',
                    at
                ),
                CookiSetHeaders(
                    60,
                    'rt',
                    rt
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
        const tokenMamanget = new TokenManajerJOSE();
        const switchFarmaciaUseCase = new SwitchMpUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body = req.body as SwitchMpLoginInterface;
        const tokensCookies = CookieParse(
            req.headers.cookie ?? ''
        );

        const cookieAt = tokensCookies['at'];
        const cookieRt = tokensCookies['rt'];
        if (!cookieAt || !cookieRt) {
            res.json({
                error: {
                    error: 'No se econtro la identificaion',
                    fix: 'No se ha encontrado los datos para continuar. Ingrese nuevamente'
                }
            });
            return;
        }        
        try {
            const dataPayloadAcToken = await tokenMamanget.validateAccessToken(cookieAt);
            const dataPayloadRtToken = await tokenMamanget.validateRefreshToken(cookieRt);
            const dataUsuario = await switchFarmaciaUseCase.execute(
                dataPayloadAcToken,
                dataPayloadRtToken,
                body.id_farmacia
            );

            const [ at, rt ] = await Promise.all([
                tokenMamanget.generateAccessToken(
                    {
                        id: dataUsuario.id,
                        username: dataUsuario.username,
                        id_farmacia: dataUsuario.farmacia.id_farmacia,
                        farmacia: dataUsuario.farmacia.farmacia,
                        id_role: dataUsuario.id_role,
                        role: dataUsuario.role, 
                    },
                    8
                ),
                tokenMamanget.generateRefresToken(
                    {
                        id: dataUsuario.id,
                        username: dataUsuario.username,
                        farmacia: dataUsuario.farmacia,
                        date: new Date(),
                    },
                    10080 * 4
                )
            ]);

            res.setHeader('Set-Cookie', [at, rt]);
            res.json("oberva las cookies!!!");
        } catch (error) {
            res.json(error);
        }
    }

    async refresh(req: Request, res: Response) {
        const tokenMamanget = new TokenManajerJOSE();
        const refreshTokenUseCase = new RefreshTokenUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const tokensCookies = CookieParse(
            req.headers.cookie ?? ''
        );
        const cookieRt = tokensCookies['rt'];
        if (!cookieRt) {
            res.json({
                error: {
                    error: 'No se econtro la identificaion',
                    fix: 'No se ha encontrado los datos para continuar. Ingrese nuevamente'
                }
            });
            return;
        }   
        try {
            
            const dataPayloadRtToken = await tokenMamanget.validateRefreshToken(cookieRt);
            const dataUsuario = await refreshTokenUseCase.execute(dataPayloadRtToken);
            const [ at, rt ] = await Promise.all([
                tokenMamanget.generateAccessToken(
                     {
                        id: dataUsuario.id,
                        username: dataUsuario.username,
                        id_farmacia: dataUsuario.farmacia.id_farmacia,
                        farmacia: dataUsuario.farmacia.farmacia,
                        id_role: dataUsuario.id_role,
                        role: dataUsuario.role, 
                    },
                    8
                ),
                tokenMamanget.generateRefresToken(
                    {
                        id: dataUsuario.id,
                        username: dataUsuario.username,
                        farmacia: dataUsuario.farmacia,
                        date: new Date(),
                    },
                    10080 * 4
                )
            ]);

            const [
                ac_cookies,
                rt_cookie
            ] = [
                CookiSetHeaders(
                    60,
                    'at',
                    at
                ),
                CookiSetHeaders(
                    60,
                    'rt',
                    rt
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