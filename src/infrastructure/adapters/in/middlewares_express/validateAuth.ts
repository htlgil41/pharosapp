import type { Request, Response, NextFunction } from 'express';
import { AutLobinValidateJoi, NewUserValidateJoi, SwitchMpLoginJoi } from '../jois/objetcsAuth.ts';

export class ValidateAuthRouteMiddleware {

    async validateLoginMiddleware (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            
            await AutLobinValidateJoi.validateAsync(req.body);
            return next();
        } catch (error) {
            
            res.json(error);
        }
    }

    async validateNewUserMiddleware (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            
            await NewUserValidateJoi.validateAsync(req.body);
            return next();
        } catch (error) {
            
            res.json(error);
        }
    }

    async validateFarmaciaFotSwithcMiddleware (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            
            await SwitchMpLoginJoi.validateAsync(req.body);
            return next();
        } catch (error) {
            
            res.json(error);
        }
    }
}