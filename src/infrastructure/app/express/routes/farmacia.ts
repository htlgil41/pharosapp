import { Router } from 'express';
import { FarmaciaRoute } from '../../../adapters/in/routes_express/farmacia.ts';

const farmaciaRoute = new FarmaciaRoute();
export const FarmaciaRouter = Router({ caseSensitive: true, strict: true })
    .get('/farmacias', 
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