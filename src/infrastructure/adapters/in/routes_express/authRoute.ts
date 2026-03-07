import type { Request, Response } from 'express';

export class AuthRoute {

    async newUsuario(req: Request, res: Response): Promise<void>{
        
        try {
            
            console.log(req.body);
            res.json("si");
        } catch (error) {
            
            throw new Error('new usuario');
        }
    }

    async login(req: Request, res: Response): Promise<void>{

        try {
            
            console.log(req.body);
            res.json("si");
        } catch (error) {
            
            throw new Error('new usuario');
        }
    }
}