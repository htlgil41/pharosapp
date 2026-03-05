export interface Farmacia {
    id: bigint;
    some_code: string;
    name_farmcia: string;
    rif: string;
    direccion: string | null;   
}

export interface CajaFarmacia {
    id: bigint;
    name_farmacia: string;
    id_farmacia: bigint;
    nm_caja: number;
    area: string;
}

export interface CajaAsigneEquipo {
    id: bigint;
    name_farmacia: string | null;
    id_farmacia: bigint | null;
    resum_equipo: string | null;
    id_equipo: bigint;
    observacion_asignacion: string | null;
}

export interface CajasAsignePuntoVenta {
    id: bigint;
    name_farmacia: string | null;
    id_farmacia: bigint | null;
    id_punto_venta: bigint;
    observacion_pos: string | null;
}