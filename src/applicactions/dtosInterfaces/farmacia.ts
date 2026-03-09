export interface NewFarmaciaDTO {
    some_code: string;
    name_farmacia: string;
    rif: string;
    direccion: string | null;
}

export interface FarmciaResponseDTO {
    id: number;
    some_code: string;
    name_farmacia: string;
    rif: string;
    direccion: string | null;
}