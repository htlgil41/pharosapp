import type { Response } from 'express';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';
import type { RequestWithDataAccessToken } from '../interfaces/request.ts';
import { GetFarmciasAsigneMyUserUseCase } from '../../../../applicactions/usesCases/getFarmciaAsigneMyUser.ts';
import { GetAllFarmaciasUseCase } from '../../../../applicactions/usesCases/getAllFarmacias.ts';
import { FarmaciaRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/farmacia.ts';

export class FarmaciaRoute {

    async getFarmaciaMyAsigne(req: RequestWithDataAccessToken, res: Response){

        if (!req.dataToken) {
            
            res.status(4001).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }

        const getFarmaciaAsigneUseCase = new GetFarmciasAsigneMyUserUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        try {
            const farmaciaAsigne = await getFarmaciaAsigneUseCase.execute(req.dataToken);
            
            res.status(200).json({
                data: {
                    message: `${farmaciaAsigne.length} farmacia/s asignada`,
                    response: farmaciaAsigne
                }
            });
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmacias(req: RequestWithDataAccessToken, res: Response) {
        if (!req.dataToken) {
            
            res.status(4001).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const getFarmaciasUseCase = new GetAllFarmaciasUseCase(
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        try {

            const farmacias = await getFarmaciasUseCase.execute();
            res.status(200).json({
                data: {
                    message: `${farmacias.length} farmacia/s asignada`,
                    response: farmacias
                }
            });
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmaciaById(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(4001).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmaciaLike(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(4001).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmaciaAsigneUsuario(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(4001).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        try {
            res.json(200)
        } catch (error) {
            res.json(error);
        }
    }
}