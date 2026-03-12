import { Router } from 'express';
import { FarmaciaRoute } from '../../../adapters/in/routes_express/farmacia.ts';
import { ValidateAccessTokenMiddleware } from '../../../adapters/in/middlewares_express/token.ts';

const validateTokenMiddleware = new ValidateAccessTokenMiddleware();
const farmaciaRoute = new FarmaciaRoute();
export const FarmaciaRouter = Router({ caseSensitive: true, strict: true })
    .get('/farmacias', 
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.getFarmacias
    )
    .get('/my',
        farmaciaRoute.getFarmaciaMyAsigne
    )
    .get('/fid/:id',
        farmaciaRoute.getFarmaciaById
    )
    .get('/flike/:search',
        farmaciaRoute.getFarmaciaLike
    )
    .get('/asigne/:id_usuario',
        farmaciaRoute.getFarmaciaAsigneUsuario
    );