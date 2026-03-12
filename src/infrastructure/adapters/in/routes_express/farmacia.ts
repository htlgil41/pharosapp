import type { Request, Response } from 'express';
import { getFarmciasAsignesUseCase } from '../../../../applicactions/usesCases/getFarmciaAsignes.ts';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';

export class FarmaciaRoute {

    async getFarmaciaMyAsigne(req: Request, res: Response){
        const getFarmaciaAsigneUseCase = new getFarmciasAsignesUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
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