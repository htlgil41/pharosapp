import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";

interface FarmaciaDTO {
    id: number;
    some_code: string;
    name_farmcia: string;
    rif: string;
    direccion: string | null;   
}

export class GetAllFarmaciasUseCase {
    constructor(
        private repo: FarmaciaRepository
    ){}

    async execute(): Promise<FarmaciaDTO[]>{
        const farmacias = await this.repo.getAllFarmacia();
        if (farmacias.length === 0) return [];
        const primitiveFarmcias = farmacias.map(f => f.toValue());
        return primitiveFarmcias;
    }
}