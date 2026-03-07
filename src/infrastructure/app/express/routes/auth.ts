import { Router } from 'express';
import { AuthRoute } from '../../../adapters/in/routes_express/authRoute.ts';
import { ValidateAuthRouteMiddleware } from '../../../adapters/in/middlewares_express/validateLogin.ts';

const authRouteIn = new AuthRoute();
const middlewareValidate = new ValidateAuthRouteMiddleware();

export const AuthRouter = Router({ caseSensitive: true, strict: true })
    .post('/login',
        middlewareValidate.validateLoginMiddleware,
        authRouteIn.login
    )
    .post('/usuario', 
        authRouteIn.newUsuario
    );