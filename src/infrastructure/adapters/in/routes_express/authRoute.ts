import type { Request, Response } from 'express';

export class AuthRoute {

    async newUsuario(req: Request, res: Response): Promise<void>{

        throw new Error('Method No define');
    }

    async login(req: Request, res: Response): Promise<void>{

        throw new Error('Method No define');
    }
}