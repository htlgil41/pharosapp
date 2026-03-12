import { Router } from 'express';
import { FarmaciaRoute } from '../../../adapters/in/routes_express/farmacia.ts';

const farmaciaRoute = new FarmaciaRoute();
export const AuthRouter = Router({ caseSensitive: true, strict: true });