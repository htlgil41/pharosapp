import { Router } from 'express';
import { FarmaciaRoute } from '../../../adapters/in/routes_express/farmacia.ts';
import { ValidateAccessTokenMiddleware } from '../../../adapters/in/middlewares_express/token.ts';
import { ValidateFarmaciaRouteMiddleware } from '../../../adapters/in/middlewares_express/validateFarmacia.ts';

const validateTokenMiddleware = new ValidateAccessTokenMiddleware();
const middlewareFarmacia = new ValidateFarmaciaRouteMiddleware();
const farmaciaRoute = new FarmaciaRoute();

export const FarmaciaRouter = Router({ caseSensitive: true, strict: true })
    .post('/caja',
        middlewareFarmacia.validateCreateCajaFarmacia,
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.createCaja
    )
    .post('/asigne',
        middlewareFarmacia.validateAsigneFarmaciaUserById,
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.asigneUsuarioFarmacia
    )
    .get('/farmacias', 
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.getFarmacias
    )
    .get('/my',
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.getFarmaciaMyAsigne
    )
    .get('/flike/:search',
        middlewareFarmacia.validateParamFarmaciaLike,
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.getFarmaciaLike
    )
    .get('/asigne/:id',
        middlewareFarmacia.validateParamUserById,
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.getFarmaciaAsigneUsuario
    )
    .get('/cajas',
        validateTokenMiddleware.ValidateAccessTokenRequest,
        farmaciaRoute.getCajaByFarmacia
    );