import { Router } from 'express';
import { AuthRoute } from '../../../adapters/in/routes_express/authRoute.ts';
import { ValidateAuthRouteMiddleware } from '../../../adapters/in/middlewares_express/validateAuth.ts';

const authRouteIn = new AuthRoute();
const middlewareAuhtValidate = new ValidateAuthRouteMiddleware();

export const AuthRouter = Router({ caseSensitive: true, strict: true })
    .post('/login',
        middlewareAuhtValidate.validateLoginMiddleware,
        authRouteIn.login
    )
    .post('/refresh',
        authRouteIn.refresh,
    )
    .post('/usuario', 
        middlewareAuhtValidate.validateNewUserMiddleware,
        authRouteIn.newUsuario
    );