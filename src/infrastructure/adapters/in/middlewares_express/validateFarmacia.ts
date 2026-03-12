import type { Request, Response, NextFunction } from 'express';
import { AsigneUsuarioFarmaciaValidateJoi, CreateCajaFarmaciaValidateJoi, FarmaciaLikeValidateJoi, UsuarioParamByIdValidateJoi } from '../jois/objectFarmacia.ts';

export class ValidateFarmaciaRouteMiddleware {

    async  validateCreateCajaFarmacia (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            
            await CreateCajaFarmaciaValidateJoi.validateAsync(req.body);
            return next();
        } catch (error) {
            
            res.status(401).json(error);
        }
    }

    async validateParamUserById (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            
            await UsuarioParamByIdValidateJoi.validateAsync(req.params);
            return next();
        } catch (error) {
            
            res.status(401).json(error);
        }
    }

    async validateAsigneFarmaciaUserById (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            
            await AsigneUsuarioFarmaciaValidateJoi.validateAsync(req.body);
            return next();
        } catch (error) {
            
            res.status(401).json(error);
        }
    }

    async validateParamFarmaciaLike (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            await FarmaciaLikeValidateJoi.validateAsync(req.params);
            return next();
        } catch (error) {
            
            res.status(401).json(error);
        }
    } 
}