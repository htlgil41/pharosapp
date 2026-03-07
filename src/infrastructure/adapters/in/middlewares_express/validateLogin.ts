import type { Request, Response, NextFunction } from 'express';
import { AutLobinValidateJoi } from '../jois/objetcs.ts';

export const ValidateLoginMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        
       await AutLobinValidateJoi.validateAsync(req.body)
       return next();
    } catch (error) {
        
        throw new Error('Erro validate');
    }
}