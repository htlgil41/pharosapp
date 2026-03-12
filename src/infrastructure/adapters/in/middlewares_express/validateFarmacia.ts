import type { Request, Response, NextFunction } from 'express';
import { FarmaciaLikeValidateJoi, UsuarioParamByIdValidateJoi } from '../jois/objectFarmacia.ts';

export class ValidateFarmaciaRouteMiddleware {

    async validateParamUserById (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            
            await UsuarioParamByIdValidateJoi.validateAsync(req.params);
            return next();
        } catch (error) {
            
            res.json(error);
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
            
            res.json(error);
        }
    } 
}