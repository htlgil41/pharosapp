import type { Response } from 'express';
import { ConnectionPharosApp } from '../../out/persistence/prisma_pg/connection.ts';
import { UsuarioRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/usuario.ts';
import type { RequestWithDataAccessToken } from '../interfaces/request.ts';
import { GetFarmciasAsigneMyUserUseCase } from '../../../../applicactions/usesCases/getFarmciaAsigneMyUser.ts';
import { GetAllFarmaciasUseCase } from '../../../../applicactions/usesCases/getAllFarmacias.ts';
import { FarmaciaRepositoryPrismaPg } from '../../out/persistence/prisma_pg/repositories/farmacia.ts';
import { GetFarmaciasLikeUseCase } from '../../../../applicactions/usesCases/getFarmaciasLike.ts';
import { GetFarmciasAsignesUseCase } from '../../../../applicactions/usesCases/getFarmciaAsignes.ts';
import { GetCajaByFarmaciaUseCase } from '../../../../applicactions/usesCases/getCajaByFarmacia.ts';
import { NewCajaFarmaciaUseCase } from '../../../../applicactions/usesCases/newCajaFarmacia.ts';
import type { CreateCajaFarmacia, CreateFarmacia, DeleteCajaFarmacia, UpdateFarmacia, UsuarioByIdParam } from '../jois/interfaces/farmacia.ts';
import { NewAsigneFarmciaToUserUseCase } from '../../../../applicactions/usesCases/newAsigneFarmaciaToUser.ts';
import { NewFarmaciaUseCase } from '../../../../applicactions/usesCases/newFarmacia.ts';
import { DeleteCajaFarmaciaUseCase } from '../../../../applicactions/usesCases/deleteCajaFarmacia.ts';
import { UpdateFarmaciaUseCase } from '../../../../applicactions/usesCases/updateFarmacia.ts';

export class FarmaciaRoute {

    async createFarmacia(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const createFarmaciaUseCase = new NewFarmaciaUseCase(
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body = req.body as CreateFarmacia;
        try {
            const createdFarmacia = await createFarmaciaUseCase.execute(
                req.dataToken,
                body,
            );
            res.status(201).json({
                data: {
                    message: `Se ha creado correctamente la farmacia `,
                    response: createdFarmacia,
                },
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async createCaja(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const createCajaFarmaciaUseCase = new NewCajaFarmaciaUseCase(
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        const body = req.body as CreateCajaFarmacia;
        try {
            const cajaCreated = await createCajaFarmaciaUseCase.execute(
                req.dataToken,
                body,
            );

            res.status(201).json({
                data: {
                    message: `Se ha creado correctamente la caja `,
                    response: cajaCreated,
                },
            });
        } catch (error) {
            res.json(error);
        }
    }

    async asigneUsuarioFarmacia(req: RequestWithDataAccessToken, res: Response) {
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const body = req.body as UsuarioByIdParam;
        const userAsigneFarmaciaUseCase = new NewAsigneFarmciaToUserUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp),
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        try {

            const asigneUsario = await userAsigneFarmaciaUseCase.execute(
                req.dataToken,
                body.id,
            );
            
            res.status(201).json({
                data: {
                    message: `Se ha asignado correctamente el usuario`,
                    response: asigneUsario,
                },
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getFarmaciaMyAsigne(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
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
            
            res.status(401).json({
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

    async getFarmaciaLike(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const getFarmaciaLikeUseCase = new GetFarmaciasLikeUseCase(
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        const { search } = req.params;
        try {
            const farmaciasLike = await getFarmaciaLikeUseCase.execute(
                req.dataToken,
                search as string
            );
            res.status(200).json({
                data: {
                    message: `Resultados de la busqueda [${search}].`,
                    response: farmaciasLike
                }
            });
        } catch (error) {
            res.json(error);
        }
    }

    async getFarmaciaAsigneUsuario(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const getFarmaciaUsuarioAsigneUseCase = new GetFarmciasAsignesUseCase(
            new UsuarioRepositoryPrismaPg(ConnectionPharosApp)
        );
        const { id } = req.params;
        try {
            const farmacias = await getFarmaciaUsuarioAsigneUseCase.execute(
                req.dataToken,
                Number(id)
            );
            res.status(200).json({
                data: {
                    message: `${farmacias.length} farmacia/s asignadas`,
                    response: farmacias
                }
            });
        } catch (error) {
            res.json(error);
        }
    }

    async getCajaByFarmacia(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const getCajasFarmaciaUseCase = new GetCajaByFarmaciaUseCase(
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        try {
            const cajas = await getCajasFarmaciaUseCase.execute(req.dataToken);
            res.status(200).json({
                data: {
                    message: `${cajas.length} caja/s asignadas`,
                    response: cajas
                }
            });
        } catch (error) {
            
            res.json(error);
        }
    }

    async updateCajaFarmacia(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const body = req.body as UpdateFarmacia;
        const updateFarmaciaUseCase = new UpdateFarmaciaUseCase(
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        try {
          const updated = await updateFarmaciaUseCase.execute(
                req.dataToken,
                {
                    direccion: body.direccion,
                    name_farmcia: body.name_farmcia,
                    rif: body.rif,
                    some_code: body.some_code
                }
            );
            
            res.status(200).json({
                data: {
                    message: `Farmacia actualizada`,
                    response: updated
                }
            });
        } catch (error) {
            
            res.json(error);
        }
    }

    async deleteCajaFarmacia(req: RequestWithDataAccessToken, res: Response){
        if (!req.dataToken) {
            
            res.status(401).json({
                error: {
                    message: 'No se ha encontrado los datos del usuario.',
                    fix: 'Ingrese nuevamente para poder realizar la busqueda.'
                }
            });
            return;
        }
        const body = req.body as DeleteCajaFarmacia;
        const deleteFarmaciaUseCase = new DeleteCajaFarmaciaUseCase(
            new FarmaciaRepositoryPrismaPg(ConnectionPharosApp)
        );
        try {
          const deleted = await deleteFarmaciaUseCase.execute(
                req.dataToken,
                { nmCaja: body.numero_caja }
            );
            
            res.status(200).json({
                data: {
                    message: `La caja #${6} fue eliminada`,
                    response: deleted
                }
            });
        } catch (error) {
            
            res.json(error);
        }
    }
}