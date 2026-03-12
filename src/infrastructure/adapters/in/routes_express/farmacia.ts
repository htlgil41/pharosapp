import type { Request, Response } from 'express';

export class FarmaciaRoute {

    async getFarmaciaMyAsigne(req: Request, res: Response){
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmacias(req: Request, res: Response) {
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmaciaById(req: Request, res: Response){
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmaciaLike(req: Request, res: Response){
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmaciaAsigneUsuario(req: Request, res: Response){
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }
}