import type { Response, NextFunction } from 'express';
import { CookieParse } from '../../../shareds/cookie.ts';
import { TokenManajerJOSE } from '../../../shareds/josetoken.ts';
import type { RequestWithDataAccessToken, RequestWithDataRefreshToken } from '../interfaces/request.ts';

export class ValidateAccessTokenMiddleware {

    private tokenMamanget = new TokenManajerJOSE();

    async ValidateAccessTokenRequest (
        req: RequestWithDataAccessToken,
        res: Response,
        next: NextFunction
    ) {
        try {
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
            req.dataToken = await this.tokenMamanget.validateAccessToken(cookieAt);;
            return next();
        } catch (error) {
            
            res.json(error);
        }
    }

    async ValidateRefreshTokenRequest (
        req: RequestWithDataRefreshToken,
        res: Response,
        next: NextFunction
    ) {
        try {
            const tokenAccessCookie = CookieParse(
                req.headers.cookie ?? ''
            );
            const cookieAt = tokenAccessCookie['rt'];
            if (!cookieAt) {
                res.json({
                    error: {
                        error: 'No se econtro la identificaion',
                        fix: 'No se ha encontrado los datos para continuar. Ingrese nuevamente'
                    }
                });
                return;
            }
            req.dataToken = await this.tokenMamanget.validateRefreshToken(cookieAt);;
            return next();
        } catch (error) {
            
            res.json(error);
        }
    }
}