export interface Farmacia {
    id: number;
    some_code: string;
    name_farmcia: string;
    rif: string;
    direccion: string | null;   
}

export interface CajaFarmacia {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number;
    nm_caja: number;
    area: string;
}

export interface CajaAsigneEquipo {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    resum_equipo: string | null;
    id_equipo: number;
    nmcaja: number;
    id_caja: number;
    observacion_asignacion: string | null;
}

export interface CajasAsignePuntoVenta {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    id_punto_venta: number;
    observacion_pos: string | null;
}