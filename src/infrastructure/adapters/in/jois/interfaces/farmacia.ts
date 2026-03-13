export interface UsuarioByIdParam {
    id: number;
}

export interface SearchParamLikeOnly {
    search: string;
}

export interface CreateCajaFarmacia {
    area: string;
    nmCaja: number;
}

export interface CreateFarmacia {
    name_farmacia: string;
    direccion: string;
    rif: string;
    some_code: string;
}