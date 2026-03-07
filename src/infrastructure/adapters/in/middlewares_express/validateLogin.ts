import type { Request, Response, NextFunction } from 'express';
import { AutLobinValidateJoi } from '../jois/objetcs.ts';

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
}