import { RegisterEquipoPcFarmaciaAggregate } from "../../domain/aggregates/registerEquipoPc.ts";
import { FarmaciaEntity } from "../../domain/entities/farmacia.ts";
import { PcEntity } from "../../domain/entities/pc.ts";
import type { EquiposRepository } from "../../domain/repositories/equipos.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import type { DataAccessToken } from "../ports/token.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface PcDTO {
    ip: string;
    anydesk: string | null;
    sa_anydesk: string | null;
    so: string;
    ram: number;
    disk: string;
    rom_size: number;
}

export class NewPcUseCase {
    constructor(
        private repoEquipo: EquiposRepository
    ){}

    async execte(
        dataUsuario: DataAccessToken,
        dto: PcDTO
    ): Promise<PcDTO> {
        if (!ServiceAuthorization.accessMulti(['coordinador', 'soportista'], dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        
        const pc = await this.repoEquipo.createEquipoPC(new RegisterEquipoPcFarmaciaAggregate(
            FarmaciaEntity.build({
                id: dataUsuario.id_farmacia,
                name_farmcia: dataUsuario.farmacia ?? '',
                rif: 'J-000000000',
                direccion: '',
                some_code: '',
            }),
            PcEntity.build({
                id: 1,
                id_farmacia: dataUsuario.id_farmacia,
                name_farmacia: dataUsuario.farmacia ,
                ip: dto.ip,
                anydesk: dto.anydesk,
                sa_anydesk: dto.sa_anydesk,
                so: dto.so,
                ram: dto.ram,
                disk: dto.disk,
                rom_size: dto.rom_size,
            }),
            1
        ));

        const pcPriimtive = pc.toValue();
        return {
            ip: pcPriimtive.ip,
            disk: pcPriimtive.disk,
            anydesk: pcPriimtive.anydesk,
            ram: pcPriimtive.ram,
            rom_size: pcPriimtive.rom_size,
            sa_anydesk: pcPriimtive.sa_anydesk,
            so: pcPriimtive.so,
        };
    }
}